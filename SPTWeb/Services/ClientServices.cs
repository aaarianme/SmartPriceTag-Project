using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;
using SPTWeb.PasswordHelpers;
using System.Runtime.CompilerServices;

namespace SPTWeb.Services
{
    public class ClientServices : IClientServices
    {
        PasswordHasher passwordHasher;
        IClientRepository clientRepository;
        IStoreRepository storeRepository;
        #region Depencency Injection
        public ClientServices(IAuthServices authServices, IClientRepository clientRepo,IStoreRepository storeRepository)
        {
            this.passwordHasher = new PasswordHasher();
            this.clientRepository = clientRepo;
            this.storeRepository = storeRepository;
        }
        #endregion



        public async Task<IActionResult> HandleAddClient(ClientDTO clientInfo)
        {
            //Checking if username already exists
            var clientExists = await clientRepository.Get(clientInfo.Username);

            if (clientExists != null) return new BadRequestObjectResult(new { message = $"Username {clientInfo.Username} is already taken" });
            Client newClient = clientInfo.ToClient();
            string hashedPass = passwordHasher.HashPassword(newClient.Pass, out byte[] salt);
            newClient.Pass = hashedPass;
            newClient.Salt = passwordHasher.ConvertFromByteArrayToString(salt);
            var newClientId = await clientRepository.Add(newClient);
            return new OkResult();
        }


        public async Task<IEnumerable<StoreDTO>> GetAllStores(int clientId)
        {
            List<StoreDTO> storeDTOs=new List<StoreDTO>();
            var allStores = await storeRepository.GetAll(clientId);
            foreach (Store s in allStores) storeDTOs.Add(s.ToStoreDTO());
            return storeDTOs;
        }

        public async Task<ClientDTO?> GetClientById(int id)
        {
            var client = await clientRepository.Get(id);
            if (client == null) return null;
            return client.ToClientDTO();
        }

        public async Task<ClientDTO?> GetClientByUsername(string username)
        {
            var client = await clientRepository.Get(username);
            if (client == null) return null;
            return client.ToClientDTO();
        }

        public async Task<IActionResult> AddNewStore(NewStoreRequestDto store, int clientid)
        {
            if (store.PIN.Length != 4) return new BadRequestObjectResult(new { message = "PIN Must be 4 digits" });
            var existingStore = await storeRepository.GetByClientIdBranchNum(clientid, store.BranchNumber);
            if(existingStore!=null) return new BadRequestObjectResult(new { message = $"Branch Number {store.BranchNumber} is already registered." });
            Store newStore = store.ToStore();
            newStore.ClientId = clientid;
            var hashedPin = passwordHasher.HashPassword(store.PIN,out byte[] salt);
            newStore.PIN = hashedPin;
            newStore.Salt = passwordHasher.ConvertFromByteArrayToString(salt);
            await storeRepository.Add(newStore);
            return new OkResult();
        }

        public async Task<IActionResult> UpdateClientInfo(ClientDTO clientInfo)
        {
            throw new NotImplementedException();
        }
    }
}
