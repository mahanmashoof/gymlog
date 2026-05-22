using FluentValidation;
using GymLog.API.Models;

namespace GymLog.API.Validators;

public class WorkoutExerciseValidator : AbstractValidator<WorkoutExercise>
{
    public WorkoutExerciseValidator()
    {
        RuleFor(x => x.WorkoutId)
            .NotEmpty().WithMessage("A workout must be specified.");

        RuleFor(x => x.ExerciseId)
            .NotEmpty().WithMessage("An exercise must be specified.");

        RuleFor(x => x.Sets)
            .GreaterThan(0).WithMessage("Sets must be greater than 0.");

        RuleFor(x => x.Reps)
            .GreaterThan(0).WithMessage("Reps must be greater than 0.");

        RuleFor(x => x.WeightKg)
            .GreaterThanOrEqualTo(0).WithMessage("Weight cannot be negative.");
    }
}