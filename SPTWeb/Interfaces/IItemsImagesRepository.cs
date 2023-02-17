namespace SPTWeb.Interfaces
{
    public interface IItemsImagesRepository
    {
        public Task<int> AddImage(int itemId);
        public Task Delete(int imageId);
        public Task<List<int>> GetAll(int itemId);

    }
}
