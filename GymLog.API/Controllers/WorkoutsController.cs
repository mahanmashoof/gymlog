using Microsoft.AspNetCore.Mvc;

namespace GymLog.API.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkoutsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok("GymLog is alive 🏋️");
    }
}