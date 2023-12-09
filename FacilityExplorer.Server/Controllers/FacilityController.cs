﻿using Microsoft.AspNetCore.Mvc;
using FacilityExplorer.Server.Repositories.FacilityRepository;
using FacilityExplorer.Server.Models.Requests;

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

        [HttpPost("facility")]
        public async Task<IActionResult> CreateFacilityAsync([FromBody] FacilityRequest facilityRequest)
        {
            var createdFacility = await _facilityService.CreateFacilityAsync(facilityRequest);
            return Ok(createdFacility);
        }

        [HttpDelete("facility/{id}")]
        public async Task<IActionResult> DeleteFacilityAsync(int id)
        {
            var facilityToDelete = await _facilityService.DeleteFacilityAsync(id);
            return facilityToDelete is null ? NotFound() : Ok(facilityToDelete);
        }

        [HttpPut("facility/{id}")]
        public async Task<IActionResult> UpdateFacilityAsync(int id, [FromBody] FacilityRequest facilityRequest)
        {
            var updatedFacility = await _facilityService.UpdateFacilityAsync(id, facilityRequest);
            return updatedFacility is null ? NotFound() : Ok(updatedFacility);
        }
    }
}