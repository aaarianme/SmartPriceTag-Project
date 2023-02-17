using SPTWeb.AzureStorage;
namespace SPTWeb.Interfaces
{
    public interface IAzureStorageManager
    {
            /// <summary>
            /// This method uploads a file submitted with the request
            /// </summary>
            /// <param name="file">File for upload</param>
            /// <returns>Blob with status</returns>
            Task<AzureBlobObjResponse> UploadAsync(IFormFile file, string fileName);

            /// <summary>
            /// This method downloads a file with the specified filename
            /// </summary>
            /// <param name="blobFilename">Filename</param>
            /// <returns>Blob</returns>
            Task<AzureBlobObj?> DownloadAsync(string blobFilename);

            /// <summary>
            /// This method deleted a file with the specified filename
            /// </summary>
            /// <param name="blobFilename">Filename</param>
            /// <returns>Blob with status</returns>
            Task<AzureBlobObjResponse> DeleteAsync(string blobFilename);

          
    }
}
