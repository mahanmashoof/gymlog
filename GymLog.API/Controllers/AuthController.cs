using Microsoft.AspNetCore.Mvc;
using GymLog.API.Models;
using GymLog.API.Services;

namespace GymLog.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var token = await _authService.RegisterAsync(request);
        if (token is null) return BadRequest("Registration failed.");
        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var token = await _authService.LoginAsync(request);
        if (token is null) return Unauthorized("Invalid credentials.");
        return Ok(new { token });
    }
}