using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Services
{
    public class StoreServices : IStoreServices
    {
        IStoreRepository StoreRepository;
        public StoreServices(IStoreRepository storeRepository)
        {
            StoreRepository = storeRepository;
        }
        public async Task<StoreDTO?> GetStoreByLoginName(string loginname)
        {
            Store? st = await StoreRepository.GetByLoginName(loginname);
            if (st == null) return null;
            return st.ToStoreDTO();
        }
    }
}
