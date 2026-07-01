using GymLog.API.Models;

namespace GymLog.API.Services;

public interface IAuthService
{
    Task<string?> RegisterAsync(RegisterRequest request);
    Task<string?> LoginAsync(LoginRequest request);
}