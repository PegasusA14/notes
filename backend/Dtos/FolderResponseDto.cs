namespace NotesApi.DTOs;

public class FolderResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    public int NoteCount { get; set; }
}
