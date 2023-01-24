using Dapper;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class StoreRepository : RepositoryDataAccessObject, IStoreRepository
    {
        public Task Add(Store store)
        {
            
            throw new NotImplementedException();
        }

        public Task DeleteByClientIdBranchNum(int clientId, int branchNum)
        {
            throw new NotImplementedException();
        }

        public Task DeleteById(int storeId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Store>> GetAll(int clientId)
        {
            object parameters = new { id = clientId };
            return await dbConn.QueryAsync<Store>("select * from stores where ClientId=@id", parameters);
        }

        public Task<Store> GetByClientIdBranchNum(int clientId, int branchNum)
        {
            throw new NotImplementedException();
        }

        public Task<Store> GetById(int storeId)
        {
            throw new NotImplementedException();
        }

        public Task Update(Store store)
        {
            throw new NotImplementedException();
        }
    }
}
