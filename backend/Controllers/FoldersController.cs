using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApi.Data;
using NotesApi.DTOs;
using NotesApi.Models;

namespace NotesApi.Controllers;

[ApiController]
[Route("folders")]
[Authorize]
public class FoldersController : ControllerBase
{
    private readonly AppDbContext _db;

    public FoldersController(AppDbContext db) => _db = db;

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    // GET /folders
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var folders = await _db.Folders
            .Where(f => f.UserId == GetUserId())
            .Include(f => f.Notes)
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();

        return Ok(folders.Select(f => new FolderResponseDto
        {
            Id = f.Id,
            Name = f.Name,
            CreatedAt = f.CreatedAt,
            NoteCount = f.Notes.Count
        }));
    }

    // POST /folders
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] FolderDto dto)
    {
        var folder = new Folder
        {
            Name = dto.Name,
            UserId = GetUserId()
        };

        _db.Folders.Add(folder);
        await _db.SaveChangesAsync();

        return Ok(new FolderResponseDto
        {
            Id = folder.Id,
            Name = folder.Name,
            CreatedAt = folder.CreatedAt,
            NoteCount = 0
        });
    }

    // DELETE /folders/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var folder = await _db.Folders
            .FirstOrDefaultAsync(f => f.Id == id && f.UserId == GetUserId());

        if (folder is null)
            return NotFound(new { message = "Folder not found" });

        _db.Folders.Remove(folder);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Folder deleted" });
    }
}
