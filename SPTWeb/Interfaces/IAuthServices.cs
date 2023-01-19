using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;

namespace SPTWeb.Interfaces
{
    public interface IAuthServices
    {
       
        /// <summary>
        /// Checks user creds against the database
        /// </summary>
        /// <param name="clientUsername">Username</param>
        /// <param name="clientPassword">pPassword</param>
        /// <returns>OK 200 If verified. 401 UnAuthorized If invalid.</returns>
        public Task<IActionResult> HandleClientLogin(string clientUsername, string clientPassword);

        


    }
}
