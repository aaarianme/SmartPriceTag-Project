using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface IStoreRepository
    {
        /// <summary>
        /// Add a new Store to the database
        /// </summary>
        /// <param name="store">full details needed except for StoreId since its auto generated </param>
        /// <returns></returns>
        public Task Add(Store store);
        /// <summary>
        /// Get a store from StoreId.
        /// </summary>
        /// <param name="storeId"></param>
        /// <returns>Will return null if not found</returns>
        public Task<Store?> GetById(int storeId);
        /// <summary>
        /// gets a store by login username null if not found
        /// </summary>
        /// <param name="loginname"></param>
        /// <returns></returns>
        public Task<Store?> GetByLoginName(string loginname);
        /// <summary>
        /// Get a store form client id and store branch num
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="branchNum">Branch num is not the same is Store.LoginUsername</param>
        /// <returns>Null if not found</returns>
        public Task<Store?> GetByClientIdBranchNum(int clientId,int branchNum);
        /// <summary>
        /// Get all stores that are linked to a clientId
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns>returns an empty list if nothing found</returns>
        public Task<IEnumerable<Store>> GetAll(int clientId);
        /// <summary>
        /// Updates the store records
        /// </summary>
        /// <param name="store">uses store.StoreId in where clause</param>
        /// <returns></returns>
        public Task Update(Store store);
        /// <summary>
        /// Delete by store id
        /// </summary>
        /// <param name="storeId"></param>
        /// <returns></returns>
        public Task DeleteById(int storeId);
        /// <summary>
        /// Delete by clientId and branch nm
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="branchNum">not the same as Store.LoginUsername</param>
        /// <returns></returns>
        public Task DeleteByClientIdBranchNum(int clientId, int branchNum);





    }
}
