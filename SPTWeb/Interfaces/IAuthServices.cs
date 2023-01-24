using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;
using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface IAuthServices
    {
       
        /// <summary>
        /// Checks user creds against the database
        /// </summary>
        /// <param name="clientUsername">Username</param>
        /// <param name="clientPassword">pPassword</param>
        /// <returns>Clinet Entity If verified. null If invalid.</returns>
        public Task<Client?> HandleClientLogin(string clientUsername, string clientPassword);

        


    }
}
