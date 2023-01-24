using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
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
            if (authRes == null) return new UnauthorizedResult();

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = true,
                IssuedUtc = DateTime.Now,

            };
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, "client"),
                new Claim(ClaimTypes.Name, authRes.ClientId.ToString()),
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
            return Ok();
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
