using Dapper;
using MySql.Data.MySqlClient;
using SPTWeb.Entity;
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
        MySqlConnection dbConn;

        public AuthRepository()
        {
            dbConn = new MySqlConnection(builder.ConnectionString);
        }

        public async Task<Client> GetClient(string username)
        {
            object parameters = new { username = username};
            return await dbConn.QueryFirstAsync<Client>("select * from clients where Username=@username",parameters);
        }

        public async Task<Client> GetClient(int clientId)
        {
            throw new NotImplementedException();
        }
    }
}
