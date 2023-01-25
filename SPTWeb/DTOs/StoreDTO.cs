using SPTWeb.Entity;

namespace SPTWeb.DTOs
{
    public class StoreDTO
    {
        public StoreDTO(string name, string address, int branchNumber, bool isActive, DateTime createdOn)
        {
            Name = name;
            Address = address;
            BranchNumber = branchNumber;
            IsActive = isActive;
            CreatedOn = createdOn.Date.ToShortDateString();
        }

        public string Name { get; set; }
        public string Address { get; set; }
        public string CreatedOn { get; set; }

        public int BranchNumber { get; set; }
        public bool IsActive { get; set; }
        public string PIN { get; set; }


        public Store ToStore()
        {
            Store store = new Store();

            store.Name = Name;
            store.Address = Address;
            store.BranchNumber = BranchNumber;
            store.IsActive = IsActive;
            store.PIN = PIN;

            return store;
        }
    }
}
