using FacilityExplorer.Server.Controllers;
using FacilityExplorer.Server.Repositories.UserManagementRepository;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Xunit;

namespace FacilityExplorer.Tests.Controllers
{
    public class UserManagementControllerTests
    {
        private readonly IUserManagementRepository _userManagementRepository = Substitute.For<IUserManagementRepository>();
        private readonly UserManagementController _userManagementController;
        public UserManagementControllerTests() => _userManagementController = new UserManagementController(_userManagementRepository);

        [Fact]
        public async Task GetRolesAsync_ShouldReturnListOfAllRolesForUser()
        {
            // Arrange
            string userEmail = "test@example.com";
            var expectedRoles = new List<string> { "Role1", "Role2" };
            _userManagementRepository.GetRolesAsync(userEmail).Returns(Task.FromResult((IReadOnlyList<string>?)expectedRoles));

            // Act
            var result = await _userManagementController.GetRolesAsync(userEmail);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var roles = Assert.IsType<List<string>>(okResult.Value);
            Assert.Equal(expectedRoles, roles);
        }

        [Fact]
        public async Task GetRolesAsync_ShouldReturnNotFoundIfUserDoesNotExist()
        {
            // Arrange
            string userEmail = "nonexistent@example.com";
            _userManagementRepository.GetRolesAsync(userEmail).Returns(Task.FromResult((IReadOnlyList<string>?)null));

            // Act
            var result = await _userManagementController.GetRolesAsync(userEmail);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetRolesAsync_ShouldReturnNotFoundIfNoRolesAssociatedWithUser()
        {
            // Arrange
            string userEmail = "userwithoutroles@example.com";
            _userManagementRepository.GetRolesAsync(userEmail).Returns(Task.FromResult<IReadOnlyList<string>?>(new List<string>()));

            // Act
            var result = await _userManagementController.GetRolesAsync(userEmail);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

    }
}
