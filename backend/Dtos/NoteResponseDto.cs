namespace NotesApi.DTOs;

public class NoteResponseDto
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string Content { get; set; } = "";
    public int? FolderId { get; set; }
    public string? FolderName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
