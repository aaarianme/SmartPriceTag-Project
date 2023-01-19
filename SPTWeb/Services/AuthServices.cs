using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SPTWeb.Services
{
    public class AuthServices : IAuthServices
    {
        #region Password hashing setup
        const int _keySize = 16;
        const int _iterations = 350000;
        HashAlgorithmName _hashAlgorithm = HashAlgorithmName.SHA512;
        #endregion
        IClientServices clientServices;
        #region Depencency Injection
        public AuthServices(IClientServices clientServices)
        {
            this.clientServices = clientServices;
        }
        #endregion

        

        public async Task<IActionResult> HandleClientLogin(string clientUsername, string clientPassword)
        {
            var client = await clientServices.GetClient(clientUsername);
            if (client == null) return new UnauthorizedResult();
            var isVerified = VerifyPassword(client.Pass, clientPassword, client.Salt);
            if (!isVerified) return new UnauthorizedResult();
            return new OkResult();
        }
    }
}
