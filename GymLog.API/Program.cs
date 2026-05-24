using Microsoft.EntityFrameworkCore;
using GymLog.API.Data;
using FluentValidation;
using FluentValidation.AspNetCore;
using GymLog.API.Validators;
using GymLog.API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gymlog.db"));
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddScoped<IValidator<Workout>, WorkoutValidator>();
builder.Services.AddScoped<IValidator<Exercise>, ExerciseValidator>();
builder.Services.AddScoped<IValidator<WorkoutExercise>, WorkoutExerciseValidator>();

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new ErrorResponse
        {
            StatusCode = 500,
            Message = "Something went wrong. Please try again later."
        });
    });
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
