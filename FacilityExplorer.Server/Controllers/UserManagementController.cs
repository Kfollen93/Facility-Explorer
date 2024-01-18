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
            IReadOnlyList<string>? roles = await _userManagementRepository.GetRolesAsync(email);
            if (roles == null) return NotFound("This user/email does not exist.");
            if (roles.Count == 0) return NotFound("No role has been associated with this user.");
            return Ok(roles);
        }
    }
}
