using GymLog.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.API.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkoutsController : ControllerBase
{
    private static readonly List<Workout> _workouts = [];
    [HttpGet]
    public IActionResult GetAll() => Ok(_workouts);

    [HttpPost]
    public IActionResult Create(Workout workout)
    {
        _workouts.Add(workout);
        return CreatedAtAction(nameof(GetAll), new { id = workout.Id }, workout);
    }
}