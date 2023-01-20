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
    }
}
