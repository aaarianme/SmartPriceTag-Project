using SPTWeb.DTOs;

namespace SPTWeb.Entity
{
    public class Store
    {
        public Store()
        {

        }
        public Store(int storeId, string name, string address, int branchNumber, DateTime createdOn, bool isActive, int clientId, string loginUsername, string pIN, string salt)
        {
            StoreId = storeId;
            Name = name;
            Address = address;
            BranchNumber = branchNumber;
            CreatedOn = createdOn;
            IsActive = isActive;
            ClientId = clientId;
            LoginUsername = loginUsername;
            PIN = pIN;
            Salt = salt;
        }

        public int StoreId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int BranchNumber { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsActive { get; set; }
        public int ClientId { get; set; }
        public string LoginUsername { get; set; }
        public string PIN { get; set; }
        public string Salt { get; set; }

        public StoreDTO ToStoreDTO()
        {
            return new StoreDTO(Name,Address,BranchNumber, CreatedOn, IsActive);
        }
    }
}
