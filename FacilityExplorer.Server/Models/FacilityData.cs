namespace FacilityExplorer.Server.Models
{
    public abstract class FacilityData
    {
        public required string Name { get; set; }
        public required string TypeOfFacility { get; set; }
        public required string Hours { get; set; }
        public required string PhoneNumber { get; set; }
        public required string WebsiteUrl { get; set; }
        public required string Description { get; set; }
        public required string Insurance { get; set; } = "N/A";
        public required string Payment { get; set; } = "N/A";
    }
}
