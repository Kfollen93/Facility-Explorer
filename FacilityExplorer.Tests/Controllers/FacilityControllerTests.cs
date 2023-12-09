using FacilityExplorer.Server.Controllers;
using FacilityExplorer.Server.Models;
using Xunit;
using NSubstitute;
using Microsoft.AspNetCore.Mvc;
using FacilityExplorer.Server.Repositories.FacilityRepository;
using FacilityExplorer.Server.Models.Requests;

namespace FacilityExplorer.Tests.Controllers
{
    public class FacilityControllerTests
    {
        private readonly IFacilityRepository _facilityRepository = Substitute.For<IFacilityRepository>();
        private readonly FacilityController _facilityController;
        public FacilityControllerTests() => _facilityController = new FacilityController(_facilityRepository);

        [Fact]
        public async Task GetAllFacilitiesAsync_ShouldReturnListOfAllFacilities()
        {
            // Arrange
            var expectedFacilities = new List<Facility>
            {
                new()
                {
                    Name = "Great Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "123 Main St", City = "Seattle", State = "WA", Zipcode = "98101" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "206-555-1234",
                    WebsiteUrl = "www.great.com",
                    Description = "A mental health facility in Seattle.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new()
                {
                    Name = "Experienced Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "123 Main St", City = "Seattle", State = "WA", Zipcode = "98101" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "206-555-1234",
                    WebsiteUrl = "www.experience.com",
                    Description = "A mental health facility in Seattle.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
            };
            _facilityRepository.GetAllFacilitiesAsync().Returns(expectedFacilities);

            // Act
            var result = await _facilityController.GetAllFacilitiesAsync();
            var okObjectResult = (OkObjectResult)result;

            // Assert
            Assert.Equal(expectedFacilities, okObjectResult.Value);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task CreateFacilityAsync_ShouldSuccessfullyCreateNewFacility()
        {
            // Arrange
            var newFacilityRequest = new FacilityRequest {
                Name = "TestName",
                TypeOfFacility = "MH",
                FullAddress = "123 St, Seattle, WA 98101",
                Hours = "9AM - 10PM",
                PhoneNumber = "TestNumber",
                WebsiteUrl = "TestWebsite",
                Description = "A mental health facility in Seattle.",
                Insurance = "Bluecross",
                Payment = "Sliding Scale"
            };

            var newFacility = new Facility()
            {
                Name = "TestName",
                TypeOfFacility = "MH",
                Address = new() { Street = "123 St", City = "Seattle", State = "WA", Zipcode = "98101" },
                Hours = "9AM - 10PM",
                PhoneNumber = "TestNumber",
                WebsiteUrl = "TestWebsite",
                Description = "A mental health facility in Seattle.",
                Insurance = "Bluecross",
                Payment = "Sliding Scale"
            };
            _facilityRepository.CreateFacilityAsync(newFacilityRequest).Returns(newFacility);

            // Act
            var result = await _facilityController.CreateFacilityAsync(newFacilityRequest);
            var okObjectResult = (OkObjectResult)result;

            // Assert
            Assert.Equal(newFacility, okObjectResult.Value);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task DeleteFacilityAsync_ShouldSuccessfullyDeleteFacility_WhenFacilityExists()
        {
            // Arrange
            var facilityToDelete = new Facility {
                Name = "TestName",
                TypeOfFacility = "MH",
                Address = new Address { Street = "123 Main St", City = "Seattle", State = "WA", Zipcode = "98101" },
                Hours = "9AM - 10PM",
                PhoneNumber = "TestNumber",
                WebsiteUrl = "TestWebsite",
                Description = "A mental health facility in Seattle.",
                Insurance = "Bluecross", Payment = "Sliding Scale"
            };
            _facilityRepository.DeleteFacilityAsync(facilityToDelete.Id).Returns(facilityToDelete);

            // Act
            var result = await _facilityController.DeleteFacilityAsync(facilityToDelete.Id);
            var okObjectResult = (OkObjectResult)result;

            // Assert
            Assert.Equal(facilityToDelete, okObjectResult.Value);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task DeleteFacilityAsync_ShouldReturnNotFound_WhenFacilityDoesNotExist()
        {
            // Act
            var result = await _facilityController.DeleteFacilityAsync(-1);
            var notFoundResult = (NotFoundResult)result;

            // Assert
            Assert.Equal(404, notFoundResult.StatusCode);
        }
    }
}
