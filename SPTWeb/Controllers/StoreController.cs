using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using SPTWeb.ExtensionMethods;
using SPTWeb.Services;

namespace SPTWeb.Controllers
{
    [Route("api/store/")]
    [ApiController]
    public class StoreController : ControllerBase
    {

        [HttpGet,Route("ip")]
        public async Task<IActionResult> GetIp()
        {
            var otherstuff = HttpContext.GetServerVariable("HTTP_X_FORWARDED_FOR");
            var con = HttpContext.Connection;
            var s = HttpContext.Request;

            return new OkObjectResult(new { remoteIp=HttpContext.Connection.RemoteIpAddress});
        }
    }
}
