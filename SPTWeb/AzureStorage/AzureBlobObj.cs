namespace SPTWeb.AzureStorage
{
    public class AzureBlobObj
    {
        public string? Uri { get; set; }
        public string? Name { get; set; }
        public string? ContentType { get; set; }
        public Stream? Content { get; set; }
    }
}
