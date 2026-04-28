namespace GymLog.API.Models;

public class Workout
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string Notes { get; set; } = string.Empty;
}