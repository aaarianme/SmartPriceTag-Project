using Dapper;
using MySql.Data.MySqlClient;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class ClientRepository : RepositoryDataAccessObject, IClientRepository
    {
        
        public async Task<Client> Get(string username)
        {
            object parameters = new { username = username};
            return await dbConn.QueryFirstOrDefaultAsync<Client>("select * from clients where Username=@username",parameters);

        }

        public async Task<Client> Get(int clientId)
        {
            object parameters = new { clientId = clientId };
            return await dbConn.QueryFirstOrDefaultAsync<Client>("select * from clients where clientId=@clientId", parameters);
        }

        public async Task<int> Add(Client clientInfo)
        {
            object parameters = new { username = clientInfo.Username, password = clientInfo.Pass, name = clientInfo.Name ,salt=clientInfo.Salt };

            return await dbConn.QuerySingleAsync<int>(@"INSERT INTO clients (Username, Pass, Salt, Name) VALUES (@username, @password, @salt, @name);
                                            SELECT LAST_INSERT_ID(); ", parameters);
        }

        public async Task Update(ClientDTO clientInfo)
        {
            throw new NotImplementedException();
        }
    }
}
