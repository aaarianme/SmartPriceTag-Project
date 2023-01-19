using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface IClientServices
    {
        public Task<Client> GetClient(string username);
        public Task<Client> GetClient(int clientId);
        public Task<IActionResult> AddClient(ClientDTO clientInfo);
    }
}
