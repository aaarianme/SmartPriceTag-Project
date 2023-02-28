using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace SPTWeb.Controllers
{
    [Route("api/hub/")]
    [ApiController]
    public class CentralHubController : ControllerBase
    {
        [Route("{storeId}")]
        public async Task<IActionResult> GetStoreTagInfo(int storeId)
        {
            return Ok();
        }
    }
}
