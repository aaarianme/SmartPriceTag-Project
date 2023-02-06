using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.ExtensionMethods;
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

        [HttpGet,Route("get"),Authorize(Policy = "client")]
        public async Task<IActionResult> GetClient()
        {
            var clientDto= await clientServices.GetClientById(User.GetUserId()); 
            if(clientDto == null) return NotFound();
            clientDto.Pass = "";
            return new OkObjectResult(new { user = clientDto });
        }

        [HttpGet,Route("stores"),Authorize(policy:"client")]
        public async Task<IActionResult> GetAllStores()
        {
            return  new OkObjectResult(new { stores= await clientServices.GetAllStores(User.GetUserId()) });
        }

        [HttpPost, Route("stores/new"), Authorize(policy: "client")]
        public async Task<IActionResult> AddNewStore(NewStoreRequestDto store)
        {
            return await clientServices.AddNewStore(store, User.GetUserId());
        }

        [HttpPost, Route("update"), Authorize(policy: "client")]
        public async Task<IActionResult> UpdateClientInfo(string username, string name, string clientid)
        {
            return await clientServices.UpdateClientInfo(username, name, clientid);
        }
    }
}
