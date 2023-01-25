using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using SPTWeb.Authentications;
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
        
        IClientRepository clientRepository;
        PasswordHasher passwordHasher;
        AuthTokenGenerator authTokenGenerator;
        #region Dependency Injection
        public AuthServices(IClientRepository clientRepository)
        {
            passwordHasher = new PasswordHasher();
            authTokenGenerator = new AuthTokenGenerator();
            this.clientRepository = clientRepository;
        }
        #endregion

        

        public async Task<string?> HandleClientLogin(string clientUsername, string clientPassword)
        {
            var client = await clientRepository.Get(clientUsername);
            if (client == null) return null;
            var isVerified = passwordHasher.VerifyPassword(client.Pass, clientPassword, client.Salt);
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Role,"client"),
                new Claim(ClaimTypes.NameIdentifier,client.ClientId.ToString())
            };

            if (!isVerified) return null;
            return authTokenGenerator.GenerateToken(claims);
        }
    }
}
