using Microsoft.AspNetCore.Mvc;
using GymLog.API.Data;
using GymLog.API.Models;

namespace GymLog.API.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkoutExercisesController : BaseController
{
    private readonly AppDbContext _db;

    public WorkoutExercisesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var entries = _db.WorkoutExercises.ToList();
        return Ok(entries);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var entry = _db.WorkoutExercises.FirstOrDefault(we => we.Id == id);
        return entry is null ? NotFoundResponse($"Entry with ID {id} was not found.") : Ok(entry);
    }

    [HttpPost]
    public IActionResult Create(WorkoutExercise entry)
    {
        var workout = _db.Workouts.FirstOrDefault(w => w.Id == entry.WorkoutId);
        if (workout is null) return BadRequestResponse($"Workout with ID {entry.WorkoutId} was not found.");

        var exercise = _db.Exercises.FirstOrDefault(e => e.Id == entry.ExerciseId);
        if (exercise is null) return BadRequestResponse($"Exercise with ID {entry.ExerciseId} was not found.");

        _db.WorkoutExercises.Add(entry);
        _db.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = entry.Id }, entry);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, WorkoutExercise updated)
    {
        var entry = _db.WorkoutExercises.FirstOrDefault(we => we.Id == id);
        if (entry is null) return NotFoundResponse($"Entry with ID {id} was not found.");

        entry.Sets = updated.Sets;
        entry.Reps = updated.Reps;
        entry.WeightKg = updated.WeightKg;

        _db.SaveChanges();
        return Ok(entry);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var entry = _db.WorkoutExercises.FirstOrDefault(we => we.Id == id);
        if (entry is null) return NotFoundResponse($"Entry with ID {id} was not found.");

        _db.WorkoutExercises.Remove(entry);
        _db.SaveChanges();
        return NoContent();
    }

    [HttpGet("by-workout/{workoutId}")]
    public IActionResult GetByWorkout(Guid workoutId)
    {
        var entries = _db.WorkoutExercises
            .Where(we => we.WorkoutId == workoutId)
            .ToList();

        return Ok(entries);
    }
}