using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Interfaces;
using System.Security.Claims;

namespace SPTWeb.Controllers
{
    [ApiController,Route("api/client/")]
    public class ClientController : ControllerBase
    {
        IClientServices clientServices;
        public ClientController(IClientServices clientServices)
        {
            this.clientServices = clientServices;
        }
        [HttpPost]
        public async Task<IActionResult> AddNewClient(ClientDTO newClientInfo)
        {
            return await clientServices.HandleAddClient(newClientInfo);
        }

        [HttpGet,Route("stores")]
        public async Task<IActionResult> GetAllStores()
        {
            var user = User.Claims;
            var isauth = User.Identity.IsAuthenticated;
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.UserData));
            return  new OkObjectResult(new { stores= await clientServices.GetAllStores(userId) });
        }
    }
}
