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
           object parameters = new { id = clientId, bid = branchNum };
           await dbConn.QueryAsync("DELETE FROM stores WHERE ClientId=@id and BranchNum=@bid"); 
        }

        public async Task DeleteById(int storeId)
        {
            object parameters = new { id=storeId };
            await dbConn.QueryAsync("DELETE FROM stores WHERE StoreId=@id");
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

        public async Task<Store?> GetById(int storeId)
        {
            object parameters = new { id = storeId };
            return await dbConn.QueryFirstOrDefaultAsync<Store>("select * from stores where StoreId = @id", parameters);
        }

        public async Task<Store?> GetByLoginName(string loginname)
        {
            object parameters = new { ln = loginname };
            return await dbConn.QueryFirstOrDefaultAsync<Store>("select * from stores where LoginUsername=@ln", parameters);
        }

        public async Task Update(Store store)
        {
            //May have to remove some of these items if never changing them
            object parameters = new { 
                name=store.Name, 
                adrr=store.Address,  
                brn=store.BranchNumber,
                created=store.CreatedOn,
                active=store.IsActive,
                id=store.ClientId,
                pin=store.PIN,
                salt=store.Salt};

            await dbConn.QueryAsync("UPDATE stores SET Name=@name, Address=@adrr, BranchNum=@brn, CreatedOn=@created, IsActive=@active, ClientId=@id, PIN=@pin, Salt=@salt");
        }
    }
}
