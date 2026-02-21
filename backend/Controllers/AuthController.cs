namespace NotesApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApi.Data;
using NotesApi.Dtos;
using NotesApi.Models;

[ApiController]
[Route("auth")]
public class AuthController: ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db) => _db = db;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var exists = await _db.Users.AnyAsync(u => u.Email == dto.Email);
        if(exists)
        {
            return BadRequest(new {message = "Email already exists"});
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = passwordHash
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok(new {message = "User created successfully"});
    }
}