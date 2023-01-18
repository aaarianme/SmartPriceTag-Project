using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPTWeb.Interfaces;

namespace SPTWeb.Controllers
{
    [ApiController , Route("api/auth/")]
    public class AuthController : ControllerBase
    {
        IAuthServices authServices;
        #region Dependecy Injection 
        public AuthController(IAuthServices authServices)
        {
            this.authServices = authServices;
        }
        #endregion


        [HttpGet , Route("client")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> LoginClientRequest(string username,string password)
        {
            return await authServices.HandleClientLogin(username, password);
        }
    }
}
