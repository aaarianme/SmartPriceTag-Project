using SPTWeb.DTOs.DtoInterfaces;
using SPTWeb.Entity;

namespace SPTWeb.DTOs
{
    public class NewStoreRequestDto:IDtoHasToStore
    {
        public NewStoreRequestDto()
        {

        }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PIN { get; set; }
        public int BranchNumber { get; set; }
        public Store ToStore()
        {
            var store= new Store();
            store.Name = Name;
            store.Address = Address;
            store.BranchNumber = BranchNumber;
            store.PIN = PIN;
            return store;
        }
    }
}
