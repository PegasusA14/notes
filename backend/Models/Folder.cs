namespace NotesApi.Models;

public class Folder
{
    public int Id {get;set;}
    public required string Name {get;set;}
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public List<Note> Notes { get; set; } = [];
}