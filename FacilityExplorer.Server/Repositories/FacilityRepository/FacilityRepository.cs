using Microsoft.EntityFrameworkCore;
using FacilityExplorer.Server.Data;
using FacilityExplorer.Server.Models;
using FacilityExplorer.Server.Models.Requests;
using FacilityExplorer.Server.Utilities;

namespace FacilityExplorer.Server.Repositories.FacilityRepository
{
    public class FacilityRepository : IFacilityRepository
    {
        private readonly DataContext _db;
        public FacilityRepository(DataContext dataContext) => _db = dataContext;

        public async Task<Facility?> CreateFacilityAsync(FacilityRequest facilityCreateRequest)
        {
            if (!AddressUtility.IsAddressFormatValid(facilityCreateRequest.FullAddress)) return null;

            var facility = new Facility()
            {
                Name = facilityCreateRequest.Name,
                TypeOfFacility = facilityCreateRequest.TypeOfFacility,
                Address = AddressUtility.CreateAddress(facilityCreateRequest.FullAddress),
                Hours = facilityCreateRequest.Hours,
                PhoneNumber = facilityCreateRequest.PhoneNumber,
                WebsiteUrl = facilityCreateRequest.WebsiteUrl,
                Description = facilityCreateRequest.Description,
                Insurance = facilityCreateRequest.Insurance,
                Payment = facilityCreateRequest.Payment
            };

            _db.Facilities.Add(facility);
            await _db.SaveChangesAsync();
            return facility;
        }

        public async Task<Facility?> DeleteFacilityAsync(int id)
        {
            var facilityToDelete = await _db.Facilities.FirstOrDefaultAsync(f => f.Id == id);

            if (facilityToDelete is null) return null;

            _db.Facilities.Remove(facilityToDelete);
            await _db.SaveChangesAsync();
            return facilityToDelete;
        }

        public async Task<IList<Facility>> GetAllFacilitiesAsync()
        {
            return await _db.Facilities.ToListAsync();
        }

        public async Task<Facility?> UpdateFacilityAsync(int id, FacilityRequest facilityUpdateRequest)
        {
            var existingFacility = await _db.Facilities.FirstOrDefaultAsync(x => x.Id == id);
            if (existingFacility is null) return null;

            if (!AddressUtility.IsAddressFormatValid(facilityUpdateRequest.FullAddress))
            {
                throw new InvalidOperationException("Invalid address format");
            }

            existingFacility.Name = facilityUpdateRequest.Name;
            existingFacility.TypeOfFacility = facilityUpdateRequest.TypeOfFacility;
            existingFacility.Address = AddressUtility.CreateAddress(facilityUpdateRequest.FullAddress);
            existingFacility.Hours = facilityUpdateRequest.Hours;
            existingFacility.PhoneNumber = facilityUpdateRequest.PhoneNumber;
            existingFacility.WebsiteUrl = facilityUpdateRequest.WebsiteUrl;
            existingFacility.Description = facilityUpdateRequest.Description;
            existingFacility.Insurance = facilityUpdateRequest.Insurance;
            existingFacility.Payment = facilityUpdateRequest.Payment;

            await _db.SaveChangesAsync();
            return existingFacility;
        }
    }
}
