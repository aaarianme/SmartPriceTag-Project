using SPTWeb.DTOs;

namespace SPTWeb.Entity
{
    public class Client
    {
        public Client()
        {

        }
        public Client(int ClientId, string Username,string Pass, string Salt, string Name)
        {
            this.ClientId = ClientId;
            this.Username = Username;
            this.Pass = Pass;
            this.Salt = Salt;
            this.Name = Name;
        }

        public int ClientId { get; set; }
        public string Username { get; set; }
        public string Pass { get; set; }
        public string Salt { get; set; }
        public string Name { get; set; }

        public ClientDTO ToClientDTO()
        {
            return new ClientDTO(ClientId.ToString(),Username, Pass, Name);
        }
    }
}
