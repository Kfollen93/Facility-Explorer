namespace FacilityExplorer.Server.Models
{
    public class Facility : FacilityData
    {
        public int Id { get; set; }
        public required Address Address { get; set; }
    }
}
