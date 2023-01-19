using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Interfaces;

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
            return await clientServices.AddClient(newClientInfo);
        }
    }
}
