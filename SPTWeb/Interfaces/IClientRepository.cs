

using SPTWeb.DTOs;
using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    
    public interface IClientRepository
    {
        /// <summary>
        /// Get a Client if username is found in the table
        /// </summary>
        /// <param name="username">Client Username</param>
        /// <returns></returns>
        public Task<Client> Get(string username);
        /// <summary>
        /// Get a Client if id is found in the table
        /// </summary>
        /// <param name="clientId">Client Id</param>
        /// <returns></returns>
        public Task<Client> Get(int clientId);
        /// <summary>
        /// Add a client to the client table
        /// </summary>
        /// <param name="clientInfo">Must have everything exept for id</param>
        /// <returns>The ClientId of the new client added</returns>
        public Task Add(Client clientInfo);
    }
}
