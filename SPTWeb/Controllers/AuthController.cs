using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using SPTWeb.Interfaces;
using System.Linq;
using System.Security.Claims;

namespace SPTWeb.Controllers
{
    [ApiController, Route("api/auth/")]
    public class AuthController : ControllerBase
    {
        IAuthServices authServices;
        IClientServices clientServices;
        #region Dependecy Injection 
        public AuthController(IAuthServices authServices,IClientServices clientServices)
        {
            this.authServices = authServices;
            this.clientServices = clientServices;
        }
        #endregion


        [HttpGet, Route("client")]
        public async Task<IActionResult> LoginClientRequest(string username, string password)
        {
            var token = await authServices.HandleClientLogin(username, password);
            if (token == null) return new UnauthorizedResult();
            var options = new CookieOptions();
            options.HttpOnly = true;
            options.IsEssential = true;
            options.Expires = DateTimeOffset.Now.AddDays(7);
            Response.Cookies.Append("auth", token, options);
            var user = await clientServices.GetClientByUsername(username);
            return new OkObjectResult(new {user=user});
            

        }

        [HttpGet, Route("test")]
        public async Task<IActionResult> aasa(string username, string password)
        {
            return new OkObjectResult(new { username = User.Identity?.Name, isauth = User.Identity?.IsAuthenticated });
        }

        [HttpGet, Route("store")]
        public async Task<IActionResult> LoginStoreRequest(string username, string password)
        {
            return Ok();
        }

        [HttpPost, Route("signout")]
        public async Task<IActionResult> SignOutUser()
        {
            Response.Cookies.Delete("auth");
            return Ok();
        }

    }
}
