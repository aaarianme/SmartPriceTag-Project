namespace SPTWeb.Entity
{
    public class Campaign
    {
        public int CampaignId { get; set; }
        public int ItemId { get; set; }
        public float WasPrice { get; set; }
        public float IsPrice { get; set; }
        public string DisplayText { get; set; } 
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Group { get; set; }


    }
}
