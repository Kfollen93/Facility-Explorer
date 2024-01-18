
namespace FacilityExplorer.Server.Repositories.UserManagementRepository
{
    public interface IUserManagementRepository
    {
        Task<IReadOnlyList<string>?> GetRolesAsync(string email);
    }
}
