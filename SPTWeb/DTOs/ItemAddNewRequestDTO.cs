using SPTWeb.Entity;

namespace SPTWeb.DTOs
{
    public class ItemAddNewRequestDTO
    {
        public string Name { get; set; }
        public float Weight { get; set; }
        public float NetWeight { get; set; }
        public string ProductDesc { get; set; }
        public string InternalId { get; set; }
        public IFormCollection Images { get; set; }

        public Item ToItem()
        {
            Item it = new Item();
            it.InternalID = InternalId;
            it.Name = Name;
            it.ProductDesc = ProductDesc;
            it.NetWeight = NetWeight;
            it.Weight = Weight;
            return it;
        }

    }
}
