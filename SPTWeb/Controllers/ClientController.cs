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

        [HttpGet,Route("stores"),Authorize(policy:"client")]
        public async Task<IActionResult> GetAllStores()
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return  new OkObjectResult(new { stores= await clientServices.GetAllStores(userId) });
        }

        [HttpPost, Route("stores/new"), Authorize(policy: "client")]
        public async Task<IActionResult> AddNewStore(StoreDTO store)
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new OkObjectResult(new { stores = await clientServices.GetAllStores(userId) });
        }
    }
}
