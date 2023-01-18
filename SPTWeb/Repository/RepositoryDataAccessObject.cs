using MySql.Data.MySqlClient;

namespace SPTWeb.Repository
{
    public abstract class RepositoryDataAccessObject
    {
        MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            Server = "sptwebdb.mysql.database.azure.com",
            Database = "sptweb",
            UserID = "awritraw",
            Password = "Capstone2023",
            SslMode = MySqlSslMode.Required,
        };
        public MySqlConnection dbConn;

        public RepositoryDataAccessObject()
        {
            dbConn = new MySqlConnection(builder.ConnectionString);
        }
    }
}
