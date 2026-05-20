using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymLog.API.Data;
using GymLog.API.Models;

namespace GymLog.API.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkoutsController : ControllerBase
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
        return workout is null ? NotFound() : Ok(workout);
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
        if (workout is null) return NotFound();

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
        if (workout is null) return NotFound();

        _db.Workouts.Remove(workout);
        _db.SaveChanges();
        return NoContent();
    }
}