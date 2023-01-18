using Microsoft.AspNetCore.Mvc;
using SPTWeb.Interfaces;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace SPTWeb.Services
{
    public class AuthServices : IAuthServices
    {
        #region password hashing setup
        const int _keySize = 16;
        const int _iterations = 350000;
        HashAlgorithmName _hashAlgorithm = HashAlgorithmName.SHA512;
        #endregion
        IAuthRepository authRepository;
        #region Depencency Injection
        public AuthServices(IAuthRepository authRepository)
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
            return new OkObjectResult(new {res = await authRepository.GetClient(clientUsername) });
        }
    }
}
