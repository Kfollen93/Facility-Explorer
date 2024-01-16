
using Microsoft.AspNetCore.Identity;

namespace FacilityExplorer.Server.Repositories.UserManagementRepository
{
    public class UserManagementRepository : IUserManagementRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        public UserManagementRepository(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IReadOnlyList<string>> GetRolesAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var rolesAssociatedWithUser = await _userManager.GetRolesAsync(user!);
            var listOfRoles = new List<string>();
            foreach (var role in rolesAssociatedWithUser)
            {
                listOfRoles.Add(role);
            }
            return listOfRoles;
        }
    }
}
