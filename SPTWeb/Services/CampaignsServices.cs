using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Services
{
    public class CampaignsServices : ICampaignsServices
    {
        ICampaignRepository campaignRepository;
        public CampaignsServices(ICampaignRepository campaignRepository)
        {
            this.campaignRepository = campaignRepository;
        }

        public async Task<List<CampaignDto>> GetAllCampaigns(int itemId)
        {
            var ent = await campaignRepository.GetAll(itemId);
            List<CampaignDto> res = new List<CampaignDto>();
            if (ent == null || ent.Count == 0) return res;

            ent.ForEach(x =>
            {
                res.Add(new CampaignDto(x));
            });
            var active = res.FirstOrDefault(x => x.StartDate?.Date <= DateTime.Now.Date && x.EndDate?.Date >= DateTime.Now.Date);
            if (active is null) res.Where(x => x.StartDate == null && x.EndDate == null).First().IsActive = true;
            else res.Where(x => x.CampaignId == active.CampaignId).First().IsActive = true;
            return res;
        }
    }
}
