namespace SPTWeb.Entity
{
    public class Item
    {
        public int ItemID { get; set; }
        public string Name { get; set; }
        public float Weight { get; set; }
        public float NetWeight { get; set; }
        public string ProductDesc { get; set; }
        public string InternalID { get; set; }
        public int StoreId { get; set; }
    }
}
