using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SPTWeb.Controllers
{
    [Route("api/auth/")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpGet , Route("store")]
        public async Task<IActionResult> Get(int id)
        {
            return new OkObjectResult(new { listings = id });

        }
    }
}
