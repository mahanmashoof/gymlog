using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymLog.API.Data;
using GymLog.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace GymLog.API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class WorkoutsController : BaseController
{
    private readonly AppDbContext _db;

    public WorkoutsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var workouts = _db.Workouts
            .Include(w => w.WorkoutExercises)
            .ToList();
        return Ok(workouts);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var workout = _db.Workouts
            .Include(w => w.WorkoutExercises)
            .FirstOrDefault(w => w.Id == id);
        return workout is null ? NotFoundResponse($"Workout with ID {id} was not found.") : Ok(workout);
    }

    [HttpPost]
    public IActionResult Create(Workout workout)
    {
        _db.Workouts.Add(workout);
        _db.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = workout.Id }, workout);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, Workout updated)
    {
        var workout = _db.Workouts.FirstOrDefault(w => w.Id == id);
        if (workout is null) return NotFoundResponse($"Workout with ID {id} was not found.");

        workout.Name = updated.Name;
        workout.Date = updated.Date;
        workout.Notes = updated.Notes;

        _db.SaveChanges();
        return Ok(workout);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var workout = _db.Workouts.FirstOrDefault(w => w.Id == id);
        if (workout is null) return NotFoundResponse($"Workout with ID {id} was not found.");

        _db.Workouts.Remove(workout);
        _db.SaveChanges();
        return NoContent();
    }

    [HttpGet("search")]
    public IActionResult Search(
    [FromQuery] string? name,
    [FromQuery] DateTime? from,
    [FromQuery] DateTime? to)
    {
        var query = _db.Workouts
            .Include(w => w.WorkoutExercises)
            .AsQueryable();

        if (!string.IsNullOrEmpty(name))
            query = query.Where(w => w.Name.Contains(name));

        if (from.HasValue)
            query = query.Where(w => w.Date >= from.Value);

        if (to.HasValue)
            query = query.Where(w => w.Date <= to.Value);

        var results = query.ToList();
        return Ok(results);
    }

    [HttpGet("by-exercise/{exerciseId}")]
    public IActionResult GetByExercise(Guid exerciseId)
    {
        var workouts = _db.Workouts
            .Include(w => w.WorkoutExercises)
            .Where(w => w.WorkoutExercises.Any(we => we.ExerciseId == exerciseId))
            .ToList();

        return Ok(workouts);
    }

    [HttpGet("recent")]
    public IActionResult GetRecent([FromQuery] int count = 5)
    {
        var workouts = _db.Workouts
            .Include(w => w.WorkoutExercises)
            .OrderByDescending(w => w.Date)
            .Take(count)
            .ToList();

        return Ok(workouts);
    }
}