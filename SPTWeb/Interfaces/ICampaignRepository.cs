using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface ICampaignRepository
    {
        public Task<int> Add(Campaign c);
        public Task<Campaign> Get(int campaignID);
        public Task<List<Campaign>> GetAll(int productId);
        public Task Delete(int campaignID);


    }
}
