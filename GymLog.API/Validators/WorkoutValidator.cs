using FluentValidation;
using GymLog.API.Models;

namespace GymLog.API.Validators;

public class WorkoutValidator : AbstractValidator<Workout>
{
    public WorkoutValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Workout must have a name.")
            .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");

        RuleFor(x => x.Date)
            .NotEmpty().WithMessage("Workout must have a date.")
            .LessThanOrEqualTo(DateTime.UtcNow).WithMessage("Date cannot be in the future.");
    }
}