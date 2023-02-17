using Azure;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using SPTWeb.Interfaces;

namespace SPTWeb.AzureStorage
{
    public class AzureStorageManager : IAzureStorageManager
    {
        private readonly string _storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=sptwebstorage;AccountKey=9fBt4+kBoe/TysmJY7zPufSdrzp2HSBp3wbkl5bCZqjUS2OwFU2GM4ZW0dkUWzYPTeg9z0XNt+hv+AStry//7A==;EndpointSuffix=core.windows.net";
        private readonly string _storageContainerName = "images";

        public async Task<AzureBlobObjResponse> DeleteAsync(string blobFilename)
        {
            BlobContainerClient client = new BlobContainerClient(_storageConnectionString, _storageContainerName);

            BlobClient file = client.GetBlobClient(blobFilename);

            try
            {
                await file.DeleteAsync();
            }
            catch (RequestFailedException ex)
                when (ex.ErrorCode == BlobErrorCode.BlobNotFound)
            {
                return new AzureBlobObjResponse { Error = true, Status = $"File with name {blobFilename} not found." };
            }

            // Return a new BlobResponseDto to the requesting method
            return new AzureBlobObjResponse { Error = false, Status = $"File: {blobFilename} has been successfully deleted." };
        }

        public async Task<AzureBlobObj?> DownloadAsync(string blobFilename)
        {
            BlobContainerClient client = new BlobContainerClient(_storageConnectionString, _storageContainerName);
            BlobClient file = client.GetBlobClient(blobFilename);
            if (await file.ExistsAsync())
            {
                var data = await file.OpenReadAsync();
                Stream blobContent = data;

                // Download the file details async
                var content = await file.DownloadContentAsync();

                // Add data to variables in order to return a BlobDto
                string name = blobFilename;
                string contentType = content.Value.Details.ContentType;

                // Create new BlobDto with blob data from variables
                return new AzureBlobObj { Content = blobContent, Name = name, ContentType = contentType };
            }
            return null;
        }



        public async Task<AzureBlobObjResponse> UploadAsync(IFormFile blob,string fileName)
        {
            AzureBlobObjResponse response = new();

            BlobContainerClient container = new BlobContainerClient(_storageConnectionString, _storageContainerName);

            BlobClient client = container.GetBlobClient(fileName);

            await using (Stream? data = blob.OpenReadStream())
            {
                BlobUploadOptions upOptions = new BlobUploadOptions
                {
                    TransferOptions = new StorageTransferOptions
                    {
                        MaximumTransferSize = 4 * 1024 * 1024,
                        InitialTransferSize = 4 * 1024 * 1024
                    }
                };
                await client.UploadAsync(data,upOptions);
            }

            response.Status = $"File {blob.FileName} Uploaded Successfully";
            response.Error = false;
            response.Blob.Uri = client.Uri.AbsoluteUri;
            response.Blob.Name = client.Name;




            return response;
        }
    }
}
