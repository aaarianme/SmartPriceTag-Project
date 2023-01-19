using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Services
{
    public class ClientServices : IClientServices
    {
        IAuthServices authServices;
        IClientRepository clientRepository;
        #region Depencency Injection
        public ClientServices(IAuthServices authServices, IClientRepository clientRepo)
        {
            this.authServices = authServices;
            this.clientRepository = clientRepo;
        }
        #endregion

        public async Task<Client> GetClient(string username)
        {
            //Activitylog

            return await clientRepository.Get(username);
        }
        public async Task<Client> GetClient(int clientId)
        {
            //Activitylog
            
            return await clientRepository.Get(clientId);
        }

        public async Task<IActionResult> AddClient(ClientDTO clientInfo)
        {
            //Checking if username already exists
            var clientExists = await clientRepository.Get(clientInfo.Username);

            if (clientExists != null) return new BadRequestObjectResult(new { message = $"Username {clientInfo.Username} is already taken" });

            Client newClient = clientInfo.ToClient();
            string hashedPass = authServices.HashPassword(newClient.Pass, out byte[] salt);
            newClient.Pass = hashedPass;
            newClient.Salt = Convert.ToHexString(salt);
            var success = clientRepository.Add(newClient);
            return new OkResult();
        }

        
    }
}
