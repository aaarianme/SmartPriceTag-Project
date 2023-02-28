using Microsoft.AspNetCore.Mvc;
using Mysqlx;
using SPTWeb.AzureStorage;
using SPTWeb.DTOs;
using SPTWeb.Entity;
using SPTWeb.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace SPTWeb.Services
{
    public class ItemsServices : IItemsSerivces
    {
        IItemsRepository itemsRepository;
        IItemsImagesRepository itemsImagesRepository;
        AzureStorageManager azureStorageManager;
        public ItemsServices(IItemsRepository itemsRepository,IItemsImagesRepository itemsImagesRepository)
        {
            this.itemsRepository = itemsRepository;
            azureStorageManager = new AzureStorageManager();
            this.itemsImagesRepository = itemsImagesRepository;
        }


        public async Task<IActionResult> AddItem(ItemAddNewRequestDTO itemDto, int storeId)
        {
            Item newItem = itemDto.ToItem();
            if (newItem == null) return new BadRequestObjectResult(new { message = "Something went wrong. Try again later." });
            if (newItem.Name == null) return new BadRequestObjectResult(new { message = "Name must be provided" });
            newItem.StoreId = storeId;
            int newId = await itemsRepository.Add(newItem);
            List<IFormFile> failedImages = new List<IFormFile>();
            int imageCount = itemDto.Images.Files.Count-1;
            while (imageCount >= 0)
            {
                var image = itemDto.Images.Files[imageCount];
                int newImageId = await itemsImagesRepository.AddImage(newId);
                bool wasUploaded = await UploadImage(newImageId.ToString(), image);
                if (!wasUploaded)
                {
                    failedImages.Add(image);
                }
                imageCount--;
            }

            if (failedImages.Count > 0)
            {
                ObjectResult acceotedRes = new ObjectResult(new { message = "Some Images were not uploaded." });
                acceotedRes.StatusCode = 202;
                return acceotedRes;
            }
            return new OkObjectResult(new { itemId=newId});
        }

        public async Task DeleteItem(int itemId)
        {
            await itemsRepository.Delete(itemId);
        }

        public async Task<List<Item>> GetAllStoreItems(int storeId)
        {
            var items = await itemsRepository.GetAllStoreItems(storeId);
           
            return items;
        }

        public async Task<(Item item, List<Stream> images)> GetItem(int itemId)
        {
            var item =await itemsRepository.GetById(itemId);
            if (item == null) return (null, null);
            List<int> allImages = await itemsImagesRepository.GetAll(itemId);
            List<Stream> streams= new List<Stream>();
            int imageId = allImages.Count - 1;
            while (imageId >= 0)
            {
                AzureBlobObj blob = await azureStorageManager.DownloadAsync(allImages[imageId].ToString());
                if (blob is not null && blob.Content is not null)
                    streams.Add(blob.Content);
                imageId--;
            }

            return (item, streams);
        }

        public async Task<bool> UploadImage(string fileName, IFormFile file)
        {
            try
            {
                await azureStorageManager.UploadAsync(file, fileName);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
