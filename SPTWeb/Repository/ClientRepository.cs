using Dapper;
using MySql.Data.MySqlClient;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class ClientRepository : RepositoryDataAccessObject, IClientRepository
    {
        
        

        public async Task<Client> Get(string username)
        {
            object parameters = new { username = username};
            return await dbConn.QuerySingleAsync<Client>("select * from clients where Username=@username",parameters);

        }

        public async Task<Client> Get(int clientId)
        {
            throw new NotImplementedException();
        }
    }
}
