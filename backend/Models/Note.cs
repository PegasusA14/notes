namespace NotesApi.Models;

public class Note
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string Content { get; set; } = "";

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; } = DateTime.Now;

    public int UserId { get; set; }
    public User User { get; set; } = null!;


    public int? FolderId { get; set; }
    public Folder? Folder { get; set; } = null!;
}