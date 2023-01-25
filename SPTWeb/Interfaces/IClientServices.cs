using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface IClientServices
    {
        /// <summary>
        /// Adds a new client
        /// </summary>
        /// <param name="clientInfo"></param>
        /// <returns>OK200 If added. BadRequest400 if error</returns>
        public Task<IActionResult> HandleAddClient(ClientDTO clientInfo);
        /// <summary>
        /// Gets all stores that belongs to this client id
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        public Task<IEnumerable<StoreDTO>> GetAllStores(int clientId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">Returns dto of a client or null if not found</param>
        /// <returns>null if not found</returns>
        public Task<ClientDTO?> GetClientById(int id);

    }
}
