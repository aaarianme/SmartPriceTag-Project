using Dapper;
using MySqlX.XDevAPI;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class StoreRepository : RepositoryDataAccessObject, IStoreRepository
    {
        public async Task Add(Store store)
        {
            object parameters = new { name=store.Name,date=DateTime.Now,addy=store.Address,bnum=store.BranchNumber,cid=store.ClientId,pin=store.PIN,salt=store.Salt };

            var command = @"INSERT INTO `sptweb`.`stores`
                        (
                        `Name`,
                        `Address`,
                    `BranchNumber`,
                     `CreatedOn`,
                    `IsActive`,
                    `ClientId`,
                    `PIN`,
                    `Salt`)
                    VALUES
                     (@name,
                      @addy,
                      @bnum,
                      @date,
                      1,
                      @cid,
                      @pin,
                      @salt);
                    ";
            await dbConn.QueryAsync(command, parameters);
        }

        public async Task DeleteByClientIdBranchNum(int clientId, int branchNum)
        {
           
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

        public async Task<Store?> GetByClientIdBranchNum(int clientId, int branchNum)
        {
            object parameters = new { id = clientId, bid = branchNum };
            return await dbConn.QueryFirstOrDefaultAsync<Store>("select * from stores where ClientId=@id and BranchNumber=@bid", parameters);
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
