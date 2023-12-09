using FacilityExplorer.Server.Utilities;
using Xunit;

namespace FacilityExplorer.Tests.Utilities
{
    public class AddressUtilityTests
    {
        [Fact]
        public void CreateAddress_ValidInput_CreatesCorrectAddress()
        {
            // Arrange
            var fullAddress = "123 Main St, Cityville, NY 12345";

            // Act
            var result = AddressUtility.CreateAddress(fullAddress);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("123 Main St", result.Street);
            Assert.Equal("Cityville", result.City);
            Assert.Equal("NY", result.State);
            Assert.Equal("12345", result.Zipcode);
        }
    }
}
