using Microsoft.EntityFrameworkCore;
using GymLog.API.Models;

namespace GymLog.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Workout> Workouts { get; set; }
}