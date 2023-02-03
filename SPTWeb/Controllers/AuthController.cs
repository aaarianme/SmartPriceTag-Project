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
        IStoreServices storeServices;
        #region Dependecy Injection 
        public AuthController(IAuthServices authServices,IClientServices clientServices,IStoreServices storeServices)
        {
            this.authServices = authServices;
            this.clientServices = clientServices;
            this.storeServices = storeServices;
        }
        #endregion


        [HttpGet, Route("client")]
        public async Task<IActionResult> LoginClientRequest(string username, string password)
        {
            var htt = HttpContext;
            var token = await authServices.HandleClientLogin(username, password);
            if (token == null) return new UnauthorizedResult();
            var options = new CookieOptions();
            options.HttpOnly = true;
            options.IsEssential = true;
            options.Expires = DateTimeOffset.Now.AddDays(7);
            Response.Cookies.Append("auth", token, options);
            var user = await clientServices.GetClientByUsername(username);
            return new OkObjectResult(new {
                user= new {
                    name = user?.Name,
                    userName = user?.Username,
                    clientId = user?.ClientId,
                }
                
            }) ;

        }

        [HttpGet, Route("store")]
        public async Task<IActionResult> LoginStoreRequest(string loginName, string pin)
        {
            var user = await storeServices.GetStoreByLoginName(loginName);
            if(user == null) return new UnauthorizedResult();
            if (!user.IsActive) return new UnauthorizedObjectResult(new {message="This Store account has been disabled by the owner."});
            var token = await authServices.HandleStoreLogin(loginName, pin);
            if (token == null) return new UnauthorizedResult();
            var options = new CookieOptions();
            options.HttpOnly = true;
            options.IsEssential = true;
            options.Expires = DateTimeOffset.Now.AddDays(7);
            Response.Cookies.Append("auth", token, options);
            return new OkObjectResult(new { store = user });
        }

        

        [HttpPost, Route("signout")]
        public async Task<IActionResult> SignOutUser()
        {
            Response.Cookies.Delete("auth");
            return Ok();
        }

    }
}
