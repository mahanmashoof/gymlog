using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using GymLog.API.Models;

namespace GymLog.API.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthService(
        UserManager<IdentityUser> userManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<string?> RegisterAsync(RegisterRequest request)
    {
        var user = new IdentityUser
        {
            UserName = request.Email,
            Email = request.Email
        };
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded) return null;
        return GenerateToken(user);
    }

    public async Task<string?> LoginAsync(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null) return null;
        var valid = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!valid) return null;
        return GenerateToken(user);
    }

    private string GenerateToken(IdentityUser user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: new[] { new Claim(ClaimTypes.Email, user.Email!) },
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}