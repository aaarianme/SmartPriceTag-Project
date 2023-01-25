using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SPTWeb.Authentications
{
    public class AuthTokenGenerator
    {
        const string _signinkey = "9BCBEAB24980B1B33CB53AC517481A459050B335D4FCE231F1C789C8B1B0F52A";
        const string _issuer = "app";
        const string _audience = "app";


        public static string IssuerSigningKey { get; private set; }
        public static string Issuer { get; private set; }
        public static string Audience { get; private set; }


        static AuthTokenGenerator()
        {
            IssuerSigningKey = _signinkey;
            Issuer = _issuer;
            Audience = _audience;

        }
        public AuthTokenGenerator()
        {

        }
        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(IssuerSigningKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(Issuer, Audience, claims, expires: DateTime.Now.AddDays(7), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
