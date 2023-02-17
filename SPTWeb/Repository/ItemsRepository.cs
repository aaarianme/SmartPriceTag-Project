using Dapper;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class ItemsRepository : RepositoryDataAccessObject, IItemsRepository
    {
        public async Task<int> Add(Item item)
        {
            var sql = @"INSERT INTO `sptweb`.`items`
                        (
                        `Name`,
                        `Weight`,
                        `NetWeight`,
                        `ProductDesc`,
                        `InternalID`,
                        `StoreId`)
                        VALUES
                        (
                        @n,
                        @w,
                        @nw,
                        @pd,
                        @ii,
                        @si);SELECT LAST_INSERT_ID();";
            object parameters = new { n = item.Name,w=item.Weight,nw=item.NetWeight,pd=item.ProductDesc,ii=item.InternalID,si=item.StoreId };
            return await dbConn.QuerySingleAsync<int>(sql, parameters);
            

        }

        public async Task<List<Item>> GetAllClientItems(int clientId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Item>> GetAllStoreItems(int storeid)
        {
            object parameters = new { id = storeid };
            var allItmes = await dbConn.QueryAsync<Item>("SELECT* FROM sptweb.items where StoreID = @id;", parameters);
            return allItmes.ToList();
        }

        public async Task<Item?> GetById(int itemId)
        {
            object parameters = new { id = itemId };
            return await dbConn.QueryFirstOrDefaultAsync<Item>("SELECT* FROM sptweb.items where ItemID = @id;", parameters);
        }

        public async Task<Item?> GetByInternalIdStoreId(int internalID, int storeId)
        {
            object parameters = new { iid = internalID,sid=storeId };
            return await dbConn.QueryFirstOrDefaultAsync<Item>("SELECT* FROM sptweb.items where InternalID = @iid StoreId=@sid", parameters);
        }
    }
}
