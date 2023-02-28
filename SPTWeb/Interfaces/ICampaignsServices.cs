using SPTWeb.DTOs;
using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface ICampaignsServices
    {
        Task<List<CampaignDto>> GetAllCampaigns(int itemId);
    }
}
