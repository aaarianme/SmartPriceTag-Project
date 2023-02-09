using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.ExtensionMethods;
using SPTWeb.Interfaces;
using System.Data;

namespace SPTWeb.Controllers
{
    [ApiController, Route("api/client/")]
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

        [HttpGet, Route("get"), Authorize(Policy = "client")]
        public async Task<IActionResult> GetClient()
        {
            var clientDto = await clientServices.GetClientById(User.GetUserId());
            if (clientDto == null) return NotFound();
            clientDto.Pass = "";
            return new OkObjectResult(new { user = clientDto });
        }

        [HttpGet, Route("stores"), Authorize(policy: "client")]
        public async Task<IActionResult> GetAllStores()
        {
            return new OkObjectResult(new { stores = await clientServices.GetAllStores(User.GetUserId()) });
        }

        [HttpPost, Route("stores/new"), Authorize(policy: "client")]
        public async Task<IActionResult> AddNewStore(NewStoreRequestDto store)
        {
            return await clientServices.AddNewStore(store, User.GetUserId());
        }

        [HttpPost, Route("update"), Authorize(policy: "client")]
        public async Task<IActionResult> UpdateClientInfo(string username, string name)
        {
            /*
             Authorize makes sure that only a verified clien can get in this method so they are already verified
             to access the client Id u can use the below code anytime
            
             */
            int clientId = User.GetUserId();
            return await clientServices.UpdateClientInfo(username, name, clientId);
        }

        [HttpGet, Route("sample")]
        public async Task<IActionResult> aaa()
        {
           
            return new OkObjectResult(new { localIp=HttpContext.Connection.LocalIpAddress.Address, localPort = HttpContext.Connection.LocalPort, id = HttpContext.Connection.Id, remotePort = HttpContext.Connection.RemotePort, remoteIp_address = HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString(), addressFamilt = HttpContext.Connection.RemoteIpAddress?.AddressFamily });
        }
    }
}
