using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SPTWeb.AzureStorage;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.ExtensionMethods;
using SPTWeb.Interfaces;
using System.IO;

namespace SPTWeb.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        IItemsSerivces itemsSerivces;
        public ItemsController(IItemsSerivces _itemsSerivces)
        {
            itemsSerivces = _itemsSerivces;
        }
        [HttpGet,Authorize]
        public async Task<IActionResult> GetAllStoreItems()
        {
            var storeId = User.GetUserId();
            var data = await itemsSerivces.GetAllStoreItems(storeId);
            return new OkObjectResult(new { items=data});
        }

        [HttpGet, Route("{id}"), Authorize]
        public async Task<IActionResult> GetItem(int id)
        {
            var res = await itemsSerivces.GetItem(id);
            if (res.item == null)
                return BadRequest();
            List<string> base64Images=new List<string>();
            res.images.ForEach(x =>
            {
                base64Images.Add(x.ConvertToBase64());
            });
            return new OkObjectResult(new { item = new { res.item, images = base64Images } });
        }

        [HttpPost,Route("{id}/images"), Authorize]
        public async Task<IActionResult> AddItemImage(int itemId, IFormCollection files)
        {
            return Ok();
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> AddItem([FromForm]IFormCollection files, [FromForm] string jsondata)
        {
            ItemAddNewRequestDTO myObj = JsonConvert.DeserializeObject<ItemAddNewRequestDTO>(jsondata);
            myObj.Images = files;
            var storeId = User.GetUserId();
            return await itemsSerivces.AddItem(myObj, storeId);
        }
    }
}
