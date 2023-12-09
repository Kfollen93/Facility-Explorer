namespace FacilityExplorer.Server.Models
{
    public class Address
    {
        public required string Street { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        public required string Zipcode { get; set; }
    }
}
