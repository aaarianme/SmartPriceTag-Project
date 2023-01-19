using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using SPTWeb.DTOs;
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
        IClientRepository authRepository;
        #region Depencency Injection
        public AuthServices(IClientRepository authRepository)
        {
            this.authRepository = authRepository;
        }
        #endregion

        public string HashPassword(string password, out byte[] salt)
        {
            salt = RandomNumberGenerator.GetBytes(_keySize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                _iterations,
                _hashAlgorithm,
                _keySize);
            return Convert.ToHexString(hash);
        }

        public bool VerifyPassword(string hashedPassword, string password, string salt)
        {
            byte[] passByte = Encoding.UTF8.GetBytes(password);
            byte[] saltByte = Convert.FromHexString(salt);
            string currentHashed = Convert.ToHexString(Rfc2898DeriveBytes.Pbkdf2(passByte, saltByte, _iterations, _hashAlgorithm, _keySize));
            return currentHashed == hashedPassword;

        }

        public async Task<IActionResult> HandleClientLogin(string clientUsername, string clientPassword)
        {
            var client = await authRepository.Get(clientUsername);
            if (client == null) return new UnauthorizedResult();
            var isVerified = VerifyPassword(client.Pass, clientPassword, client.Salt);
            if (!isVerified) return new UnauthorizedResult();
            return new OkResult();
        }

        public async Task<IActionResult> AddNewClient(ClientDTO clientInfo)
        {
            throw new NotImplementedException();

            //Checking if username already exists. Maybe not necessary?
            var clientExists = await authRepository.Get(clientInfo.Username);

            //Not sure if this is the right thing to return here.
            if (clientExists != null) return new UnauthorizedResult();

            //Attempt adding client
            var success = authRepository.AddNewClient(clientInfo);

            //Not sure what the above will actually return on an insert query?
            if ()
            {
                return new OkResult();
            }

            return new UnauthorizedResult();
        }
 
        


    }
}
