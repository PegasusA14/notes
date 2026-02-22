using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApi.Data;
using NotesApi.DTOs;
using NotesApi.Models;

namespace NotesApi.Controllers;

[ApiController]
[Route("notes")]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _db;

    public NotesController(AppDbContext db) => _db = db;

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    // POST /notes
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] NoteDto dto)
    {
        var note = new Note
        {
            Title = dto.Title,
            Content = dto.Content,
            FolderId = dto.FolderId,
            UserId = GetUserId()
        };

        _db.Notes.Add(note);
        await _db.SaveChangesAsync();

        return Ok(MapToResponse(note));
    }

    // GET /notes
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var notes = await _db.Notes
            .Where(n => n.UserId == GetUserId())
            .Include(n => n.Folder)
            .OrderByDescending(n => n.CreatedAt)
            .ToListAsync();

        return Ok(notes.Select(MapToResponse));
    }

    // GET /notes/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var note = await _db.Notes
            .Include(n => n.Folder)
            .FirstOrDefaultAsync(n => n.Id == id && n.UserId == GetUserId());

        if (note is null)
            return NotFound(new { message = "Note not found" });

        return Ok(MapToResponse(note));
    }

    // PUT /notes/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] NoteDto dto)
    {
        var note = await _db.Notes
            .FirstOrDefaultAsync(n => n.Id == id && n.UserId == GetUserId());

        if (note is null)
            return NotFound(new { message = "Note not found" });

        note.Title = dto.Title;
        note.Content = dto.Content;
        note.FolderId = dto.FolderId;
        note.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return Ok(MapToResponse(note));
    }

    // DELETE /notes/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var note = await _db.Notes
            .FirstOrDefaultAsync(n => n.Id == id && n.UserId == GetUserId());

        if (note is null)
            return NotFound(new { message = "Note not found" });

        _db.Notes.Remove(note);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Note deleted" });
    }

    // Reusable mapper
    private static NoteResponseDto MapToResponse(Note note) => new()
    {
        Id = note.Id,
        Title = note.Title,
        Content = note.Content,
        FolderId = note.FolderId,
        FolderName = note.Folder?.Name,
        CreatedAt = note.CreatedAt,
        UpdatedAt = note.UpdatedAt
    };
}
