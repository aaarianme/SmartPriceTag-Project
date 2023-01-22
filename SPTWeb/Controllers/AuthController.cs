using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using SPTWeb.Interfaces;
using System.Security.Claims;

namespace SPTWeb.Controllers
{
    [ApiController, Route("api/auth/")]
    public class AuthController : ControllerBase
    {
        IAuthServices authServices;
        #region Dependecy Injection 
        public AuthController(IAuthServices authServices)
        {
            this.authServices = authServices;
        }
        #endregion


        [HttpGet, Route("client")]
        public async Task<IActionResult> LoginClientRequest(string username, string password)
        {
            var authRes = await authServices.HandleClientLogin(username, password);
            if (((IStatusCodeActionResult)authRes).StatusCode == 401) return authRes;

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = true,
                IssuedUtc = DateTime.Now,
                
            };
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, "client"),
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);
            
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
            return authRes;
        }

        [HttpGet, Route("test")]
        [Authorize(policy: "client")]
        public async Task<IActionResult> test(string username)
        {
            return new OkObjectResult(new { res= HttpContext.User.Identity });
        }

        [HttpGet, Route("store")]
        public async Task<IActionResult> LoginStoreRequest(string username, string password)
        {
            return Ok();
        }

        [HttpPost, Route("signout")]
        public async Task<IActionResult> SignOutUser()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

    }
}
