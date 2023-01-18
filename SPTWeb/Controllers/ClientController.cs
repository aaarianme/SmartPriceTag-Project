using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SPTWeb.Controllers
{
    [ApiController, Authorize(policy:"client"),Route("api/client/")]
    public class ClientController : ControllerBase
    {
        
    }
}
