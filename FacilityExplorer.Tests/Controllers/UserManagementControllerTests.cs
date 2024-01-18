using FacilityExplorer.Server.Controllers;
using FacilityExplorer.Server.Repositories.UserManagementRepository;
using NSubstitute;

namespace FacilityExplorer.Tests.Controllers
{
    internal class UserManagementControllerTests
    {
        private readonly IUserManagementRepository _userManagementRepository = Substitute.For<IUserManagementRepository>();
        private readonly UserManagementController _userManagementController;
        public UserManagementControllerTests() => _userManagementController = new UserManagementController(_userManagementRepository);
    }
}
