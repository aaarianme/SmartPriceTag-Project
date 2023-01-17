using MySql.Data.MySqlClient;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class AuthRepository : IAuthRepository
    {
        MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            Server = "sptwebdb.mysql.database.azure.com",
            Database = "sptweb",
            UserID = "awritraw",
            Password = "Capstone2023",
            SslMode = MySqlSslMode.Required,
        };
    }
}
