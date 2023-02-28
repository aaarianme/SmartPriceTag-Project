using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPTWeb.Interfaces;

namespace SPTWeb.Controllers
{
    [Route("api/campaigns/")]
    [ApiController]
    public class CampaignsController : ControllerBase
    {
        ICampaignsServices campaignsServices;
        public CampaignsController(ICampaignsServices campaignsServices)
        {
            this.campaignsServices = campaignsServices;
        }
        [HttpGet,Route("item/{id}")]
        public async Task<IActionResult> GetItemCampaigns(int id)
        {
            return new OkObjectResult(new { campaigns=await campaignsServices.GetAllCampaigns(id) });
        }
    }
}
