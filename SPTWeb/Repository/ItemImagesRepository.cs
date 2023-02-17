using Dapper;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class ItemImagesRepository : RepositoryDataAccessObject, IItemsImagesRepository
    {
        public async Task<int> AddImage(int itemId)
        {
            object parameters = new { id=itemId };
            return await dbConn.QuerySingleAsync<int>(@"INSERT INTO item_images (ItemId) VALUES (@id);
                                            SELECT LAST_INSERT_ID(); ", parameters);
        }
        public async Task<List<int>> GetAll(int itemId)
        {
            object parameters = new { id = itemId };
            return (await dbConn.QueryAsync<int>(@" Select ImageId from item_images where ItemId=@id", parameters)).ToList();
        }
        public async Task Delete(int imageId)
        {
            object parameters = new { id = imageId };
            await dbConn.QuerySingleAsync<int>(@"Delete from item_images where ImageId=@id ", parameters);
        }
    }
}
