using System.Security.Claims;
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
    }
}
