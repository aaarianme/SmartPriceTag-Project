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
        IStoreRepository storeRepository;

        PasswordHasher passwordHasher;
        AuthTokenGenerator authTokenGenerator;
        #region Dependency Injection
        public AuthServices(IClientRepository clientRepository,IStoreRepository _storeRepository)
        {
            passwordHasher = new PasswordHasher();
            authTokenGenerator = new AuthTokenGenerator();
            storeRepository = _storeRepository;
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

        public async Task<string?> HandleStoreLogin(string loginname, string pin)
        {
            var store = await storeRepository.GetByLoginName(loginname);
            if (store == null) return null;
            var isVerified = passwordHasher.VerifyPassword(store.PIN, pin, store.Salt);
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Role,"store"),
                new Claim(ClaimTypes.NameIdentifier,store.StoreId.ToString())
            };
            if (!isVerified) return null;
            return authTokenGenerator.GenerateToken(claims);
        }
    }
}
