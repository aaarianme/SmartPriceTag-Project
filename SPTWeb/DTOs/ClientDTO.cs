using SPTWeb.Entity;

namespace SPTWeb.DTOs
{
    public class ClientDTO
    {
        public ClientDTO(string clientid,string Username, string Pass,string Name)
        {
            this.Username = Username;
            this.Pass = Pass;
            this.Name = Name;
            this.ClientId = clientid;
        }
        public string ClientId { get; set; }
        public string Username { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }


        public Client ToClient()
        {
            Client newClient = new Client();

            newClient.Username = Username;
            newClient.Pass = Pass;
            newClient.Name = Name;

            return newClient;
        }

    }
}
