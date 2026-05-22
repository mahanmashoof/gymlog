using FluentValidation;
using GymLog.API.Models;

namespace GymLog.API.Validators;

public class ExerciseValidator : AbstractValidator<Exercise>
{
    public ExerciseValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Exercise must have a name.")
            .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");
    }
}