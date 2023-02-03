using SPTWeb.DTOs;

namespace SPTWeb.Interfaces
{
    public interface IStoreServices
    {
        public Task<StoreDTO?> GetStoreByLoginName(string loginname);

    }
}
