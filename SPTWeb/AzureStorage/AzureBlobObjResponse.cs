using SPTWeb.AzureStorage;

namespace SPTWeb.AzureStorage
{
    public class AzureBlobObjResponse
    {
        public string? Status { get; set; }
        public bool Error { get; set; }
        public AzureBlobObj Blob { get; set; }

        public AzureBlobObjResponse()
        {
            Blob = new AzureBlobObj();
        }
    }
}
