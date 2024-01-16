using Microsoft.AspNetCore.Mvc;
using FacilityExplorer.Server.Repositories.UserManagementRepository;

namespace FacilityExplorer.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserManagementController : ControllerBase
    {
        private readonly IUserManagementRepository _userManagementRepository;
        public UserManagementController(IUserManagementRepository userManagementRepository) 
            => _userManagementRepository = userManagementRepository;

        [HttpGet("roles/{email}")]
        public async Task<IActionResult> GetRolesAsync(string email)
        {
            var roles = await _userManagementRepository.GetRolesAsync(email);
            return Ok(roles);
        }
    }
}
