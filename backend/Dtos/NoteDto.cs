namespace NotesApi.DTOs;

public class NoteDto
{
    public required string Title { get; set; }
    public string Content { get; set; } = "";
    public int? FolderId { get; set; }
}
