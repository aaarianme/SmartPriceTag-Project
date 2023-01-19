

using SPTWeb.DTOs;
using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    
    public interface IClientRepository
    {
        public Task<Client> Get(string username);
        public Task<Client> Get(int clientId);

        //Adding this, may need to be removed. Just trying things
        public Task<Client> AddNewClient(ClientDTO clientInfo);
    }
}
