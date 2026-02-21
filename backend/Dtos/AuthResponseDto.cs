namespace NotesApi.DTOs;

public class AuthResponseDto
{
    public required string Token { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
}
