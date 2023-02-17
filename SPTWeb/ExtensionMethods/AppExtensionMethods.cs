using System.Security.Claims;
using System.Text;
using SPTWeb.Enum;
using static SPTWeb.Enum.AppEnums;

namespace SPTWeb.ExtensionMethods
{
    public static class AppExtensionMethods
    {
        public static int GetUserId(this ClaimsPrincipal principal)
        {
            var user = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            var castResult = int.TryParse(user, out var userId);
            return userId;
        }
        public static UserRole GetUserRole(this ClaimsPrincipal principal)
        {
            var role = principal.FindFirstValue(ClaimTypes.Role);
            if (role == "store") return UserRole.store;
            return UserRole.client;
        }

        public static string ConvertToBase64(this Stream stream)
        {
            byte[] bytes;
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                bytes = memoryStream.ToArray();
            }

            string base64 = Convert.ToBase64String(bytes);
            return base64;
        }
    }
}
