using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;
using SPTWeb.PasswordHelpers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SPTWeb.Services
{
    public class AuthServices : IAuthServices
    {
        
        IClientServices clientServices;
        PasswordHasher passwordHasher;
        #region Dependency Injection
        public AuthServices(IClientServices clientServices)
        {
            this.clientServices = clientServices;
            passwordHasher = new PasswordHasher();
        }
        #endregion

        

        public async Task<IActionResult> HandleClientLogin(string clientUsername, string clientPassword)
        {
            var client = await clientServices.GetClient(clientUsername);
            if (client == null) return new UnauthorizedResult();
            var isVerified = passwordHasher.VerifyPassword(client.Pass, clientPassword, client.Salt);
            if (!isVerified) return new UnauthorizedResult();
            return new OkResult();
        }
    }
}
