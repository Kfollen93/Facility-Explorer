using Microsoft.AspNetCore.Mvc;
using FacilityExplorer.Server.Repositories.FacilityRepository;
using FacilityExplorer.Server.Models.Requests;
using Microsoft.AspNetCore.Authorization;

namespace FacilityExplorer.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class FacilityController : ControllerBase
    {
        private readonly IFacilityRepository _facilityService;
        public FacilityController(IFacilityRepository facilityService) => _facilityService = facilityService;

        [HttpGet("facilities")]
        public async Task<IActionResult> GetAllFacilitiesAsync()
        {
            var facilities = await _facilityService.GetAllFacilitiesAsync();
            return Ok(facilities);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("facility")]
        public async Task<IActionResult> CreateFacilityAsync([FromBody] FacilityRequest facilityRequest)
        {
            var createdFacility = await _facilityService.CreateFacilityAsync(facilityRequest);
            return createdFacility is null ? BadRequest("Invalid address format.") : Ok(createdFacility);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("facility/{id}")]
        public async Task<IActionResult> DeleteFacilityAsync(int id)
        {
            var facilityToDelete = await _facilityService.DeleteFacilityAsync(id);
            return facilityToDelete is null ? NotFound($"The facility with an id of {id} does not exist.") : Ok(facilityToDelete);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("facility/{id}")]
        public async Task<IActionResult> UpdateFacilityAsync(int id, [FromBody] FacilityRequest facilityRequest)
        {
            var updatedFacility = await _facilityService.UpdateFacilityAsync(id, facilityRequest);
            return updatedFacility is null ? NotFound($"The facility with an id of {id} does not exist.") : Ok(updatedFacility);
        }
    }
}