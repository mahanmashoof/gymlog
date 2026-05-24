using Microsoft.AspNetCore.Mvc;
using GymLog.API.Models;

namespace GymLog.API.Controllers;

public class BaseController : ControllerBase
{
    protected IActionResult NotFoundResponse(string message)
    {
        return NotFound(new ErrorResponse
        {
            StatusCode = 404,
            Message = message
        });
    }

    protected IActionResult BadRequestResponse(string message)
    {
        return BadRequest(new ErrorResponse
        {
            StatusCode = 400,
            Message = message
        });
    }
}