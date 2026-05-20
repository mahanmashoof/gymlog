namespace GymLog.API.Models;

public class WorkoutExercise
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid WorkoutId { get; set; }
    public Guid ExerciseId { get; set; }
    public int Sets { get; set; }
    public int Reps { get; set; }
    public double WeightKg { get; set; }
}