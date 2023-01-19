using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;
using SPTWeb.PasswordHelpers;

namespace SPTWeb.Services
{
    public class ClientServices : IClientServices
    {
        PasswordHasher passwordHasher;
        IClientRepository clientRepository;
        #region Depencency Injection
        public ClientServices(IAuthServices authServices, IClientRepository clientRepo)
        {
            this.passwordHasher = new PasswordHasher();
            this.clientRepository = clientRepo;
        }
        #endregion

        

        public async Task<IActionResult> AddClient(ClientDTO clientInfo)
        {
            //Checking if username already exists
            var clientExists = await clientRepository.Get(clientInfo.Username);

            if (clientExists != null) return new BadRequestObjectResult(new { message = $"Username {clientInfo.Username} is already taken" });
            Client newClient = clientInfo.ToClient();
            string hashedPass = passwordHasher.HashPassword(newClient.Pass, out byte[] salt);
            newClient.Pass = hashedPass;
            newClient.Salt = passwordHasher.ConvertFromByteArrayToString(salt);
            await clientRepository.Add(newClient);
            return new OkResult();
        }

        
    }
}
