using Microsoft.AspNetCore.Mvc;
using GymLog.API.Data;
using GymLog.API.Models;

namespace GymLog.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ExercisesController : ControllerBase
{
    private readonly AppDbContext _db;

    public ExercisesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var exercises = _db.Exercises.ToList();
        return Ok(exercises);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var exercise = _db.Exercises.FirstOrDefault(e => e.Id == id);
        return exercise is null ? NotFound() : Ok(exercise);
    }

    [HttpPost]
    public IActionResult Create(Exercise exercise)
    {
        _db.Exercises.Add(exercise);
        _db.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = exercise.Id }, exercise);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var exercise = _db.Exercises.FirstOrDefault(e => e.Id == id);
        if (exercise is null) return NotFound();

        _db.Exercises.Remove(exercise);
        _db.SaveChanges();
        return NoContent();
    }
}