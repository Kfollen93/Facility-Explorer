using FacilityExplorer.Server.Models;
using FacilityExplorer.Server.Models.Requests;

namespace FacilityExplorer.Server.Repositories.FacilityRepository
{
    public interface IFacilityRepository
    {
        Task<IList<Facility>> GetAllFacilitiesAsync();
        Task<Facility?> CreateFacilityAsync(FacilityRequest facilityCreateRequest);
        Task<Facility?> UpdateFacilityAsync(int id, FacilityRequest facilityUpdateRequest);
        Task<Facility?> DeleteFacilityAsync(int id);
    }
}
