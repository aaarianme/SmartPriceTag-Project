

using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    
    public interface IAuthRepository
    {
        public Task<Client> GetClient(string username);
        public Task<Client> GetClient(int clientId);

    }
}
