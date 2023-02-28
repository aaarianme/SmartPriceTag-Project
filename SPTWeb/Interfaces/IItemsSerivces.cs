using Microsoft.AspNetCore.Mvc;
using SPTWeb.AzureStorage;
using SPTWeb.DTOs;
using SPTWeb.Entity;

namespace SPTWeb.Interfaces
{
    public interface IItemsSerivces
    {
        public Task<List<Item>> GetAllStoreItems(int storeId);
        public Task<(Item item,List<Stream> images)> GetItem(int itemId);
        public Task<bool> UploadImage(string filename, IFormFile file);
        public Task<IActionResult> AddItem(ItemAddNewRequestDTO itemDto,int storeId);
        public Task DeleteItem(int itemId);

    }
}
