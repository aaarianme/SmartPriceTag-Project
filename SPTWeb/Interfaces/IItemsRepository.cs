using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface IItemsRepository
    {
        public Task<Item?> GetById(int itemId);
        public Task<int> Add(Item item);
        public Task<Item?> GetByInternalIdStoreId(int internalID,int storeId);
        public Task<List<Item>> GetAllStoreItems(int storeid);
        public Task<List<Item>> GetAllClientItems(int clientId);

    }
}
