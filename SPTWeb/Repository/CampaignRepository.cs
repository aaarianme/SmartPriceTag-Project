using Dapper;
using SPTWeb.Entity;
using SPTWeb.Interfaces;

namespace SPTWeb.Repository
{
    public class CampaignRepository :RepositoryDataAccessObject, ICampaignRepository
    {
        public async Task<int> Add(Campaign c)
        {
            object parameters = new { ii = c.ItemId , wp=c.WasPrice , ip=c.IsPrice , dt=c.DisplayText , sd=c.StartDate , ed=c.EndDate , g=c.Group };
            return await dbConn.QueryFirstOrDefaultAsync<int>(@"INSERT INTO `sptweb`.`campaigns`
                                                                    (
                                                                    `ItemId`,
                                                                    `WasPrice`,
                                                                    `IsPrice`,
                                                                    `DisplayText`,
                                                                    `StartDate`,
                                                                    `EndDate`,
                                                                    `Group`)
                                                                    VALUES
                                                                    (
                                                                    @ii,
                                                                    @wp,
                                                                    @ip,
                                                                    @dt,
                                                                    @sd,
                                                                    @ed,
                                                                    @g); SELECT LAST_INSERT_ID();
                                                                    ", parameters);

        }
        public async Task<Campaign> Get(int campaignID)
        {
            object parameters = new { id=campaignID };
            return await dbConn.QueryFirstOrDefaultAsync<Campaign>(@"SELECT * from `sptweb`.`campaigns` where CampaignId=@id", parameters);
        }
        public async Task Delete(int campaignID)
        {
            object parameters = new { id = campaignID };
             await dbConn.QueryFirstOrDefaultAsync<Campaign>(@"DELETE FROM `sptweb`.`campaigns`
                                                                WHERE CampaignId=@id;
                                                                ", parameters);
        }

        public async Task<List<Campaign>> GetAll(int itemId)
        {
            object parameters = new { id = itemId };
            var res = (await dbConn.QueryAsync<Campaign>(@"SELECT * from `sptweb`.`campaigns` where ItemId=@id", parameters)).ToList();
            return res;
        }
    }
}
