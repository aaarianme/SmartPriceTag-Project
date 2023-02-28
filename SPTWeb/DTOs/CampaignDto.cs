using SPTWeb.Entity;

namespace SPTWeb.DTOs
{
    public class CampaignDto
    {
        public CampaignDto(Campaign c)
        {
            IsActive = false;
            CampaignId = c.CampaignId;
            ItemId = c.ItemId;
            WasPrice = c.WasPrice;
            IsPrice=c.IsPrice;
            DisplayText = c.DisplayText;
            StartDate = c.StartDate?.Date;
            EndDate = c.EndDate?.Date;
            Group = c.Group;
        }
        public int CampaignId { get; set; }
        public int ItemId { get; set; }
        public float WasPrice { get; set; }
        public float IsPrice { get; set; }
        public string DisplayText { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Group { get; set; }
        public bool IsActive { get; set; }
    }
}
