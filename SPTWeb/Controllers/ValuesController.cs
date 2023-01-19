using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPTWeb.Interfaces;

namespace SPTWeb.Controllers
{
    [Route("api/view/")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        IAuthServices hh;
        public ValuesController(IAuthServices h)
        {
            hh = h;
        }


        [Route("name")]
        public IActionResult GetMeViews(string name)
        {
            return new BadRequestObjectResult(new { YourNameIs = name });
        }
    }
}
