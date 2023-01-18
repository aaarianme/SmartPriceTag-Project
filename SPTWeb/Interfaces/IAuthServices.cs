using Microsoft.AspNetCore.Mvc;
using SPTWeb.DTOs;

namespace SPTWeb.Interfaces
{
    public interface IAuthServices
    {
        /// <summary>
        /// Hashes Passwords with a self generated Salt that will be an out param
        /// </summary>
        /// <param name="password">The given password</param>
        /// <param name="salt">out param</param>
        /// <returns>The Hashed Password</returns>
        public string HashPassword(string password, out byte[] salt);
        /// <summary>
        /// Verify if the given password matches the hashed password.
        /// </summary>
        /// <param name="hashedPassword">The Hashed password</param>
        /// <param name="password">The given Password</param>
        /// <param name="salt">The salt used to hash hashedPassword</param>
        /// <returns>True if verified. False if verification fails</returns>
        public bool VerifyPassword(string hashedPassword, string password, string salt);
        /// <summary>
        /// Checks user creds against the database
        /// </summary>
        /// <param name="clientUsername">Username</param>
        /// <param name="clientPassword">pPassword</param>
        /// <returns>OK 200 If verified. 401 UnAuthorized If invalid.</returns>
        public Task<IActionResult> HandleClientLogin(string clientUsername, string clientPassword);

        


    }
}
