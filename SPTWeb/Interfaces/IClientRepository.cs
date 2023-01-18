

using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    
    public interface IClientRepository
    {
        public Task<Client> Get(string username);
        public Task<Client> Get(int clientId);

    }
}
