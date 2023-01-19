using System.Security.Cryptography;
using System.Text;

namespace SPTWeb.PasswordHelpers
{
    /// <summary>
    /// Hash or verify passwords with the same setup that is used to generate salt and hashedPass
    /// </summary>
    public class PasswordHasher
    {
        #region Password hashing setup
        const int _keySize = 16;
        const int _iterations = 350000;
        HashAlgorithmName _hashAlgorithm = HashAlgorithmName.SHA512;
        #endregion

        /// <summary>
        /// Hashes Passwords with a self generated Salt that will be an out param
        /// </summary>
        /// <param name="password">The given password</param>
        /// <param name="salt">out param</param>
        /// <returns>The Hashed Password</returns>
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
        /// <summary>
        /// Verify if the given password matches the hashed password.
        /// </summary>
        /// <param name="hashedPassword">The Hashed password</param>
        /// <param name="password">The given Password</param>
        /// <param name="salt">The salt used to hash hashedPassword</param>
        /// <returns>True if verified. False if verification fails</returns>
        public bool VerifyPassword(string hashedPassword, string password, string salt)
        {
            byte[] passByte = Encoding.UTF8.GetBytes(password);
            byte[] saltByte = Convert.FromHexString(salt);
            string currentHashed = ConvertFromByteArrayToString(Rfc2898DeriveBytes.Pbkdf2(passByte, saltByte, _iterations, _hashAlgorithm, _keySize));
            return currentHashed == hashedPassword;

        }
        /// <summary>
        /// Keep the same data string format everytime you want to have byte[] to string
        /// </summary>
        /// <param name="item">array of byte</param>
        /// <returns>HexString of byte[]</returns>
        public string ConvertFromByteArrayToString(byte[] item) { return Convert.ToHexString(item); }
    }
}
