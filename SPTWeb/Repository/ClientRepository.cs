using Dapper;
using MySql.Data.MySqlClient;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;
using System.ComponentModel;

namespace SPTWeb.Repository
{
    public class ClientRepository : RepositoryDataAccessObject, IClientRepository
    {
        
        

        public async Task<Client> GetClient(string username)
        {
            object parameters = new { username = username};
            return await dbConn.QuerySingleAsync<Client>("select * from clients where Username=@username",parameters);
        }

        //Gets a client based on an ID
        public async Task<Client> GetClient(int clientId)
        {
            object parameters = new { clientId = clientId };
            return await dbConn.QuerySingleAsync<Client>("select * from clients where clientId=@clientId", parameters);
        }

        public async Task<Client> AddNewClient(ClientDTO clientInfo)
        {
            throw new NotImplementedException();
            //Not done
            object parameters = new { username = clientInfo.Username, password = clientInfo.Pass, name = clientInfo.Name };
            return await dbConn.Query("");
        }
    }
}

