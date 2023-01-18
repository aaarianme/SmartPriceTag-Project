namespace SPTWeb.DTOs
{
    public class ClientDTO
    {
        public ClientDTO(string Username, string Pass,string Name)
        {
            this.Username = Username;
            this.Pass = Pass;
            this.Name = Name;
        }

        public string Username { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
    }
}
