using FacilityExplorer.Server.Utilities;
using Xunit;

namespace FacilityExplorer.Tests.Utilities
{
    public class AddressUtilityTests
    {
        [Fact]
        public void IsAddressFormatValid_ValidAddress_ReturnsTrue()
        {
            // Arrange
            string validAddress = "123 Main St, Cityville, CA 12345";

            // Act
            bool result = AddressUtility.IsAddressFormatValid(validAddress);

            // Assert
            Assert.True(result);
        }

        [Theory]
        [InlineData("")]
        [InlineData("InvalidAddress")]
        [InlineData("Street, City")]
        [InlineData("Street, City, State")]
        [InlineData("Street, City, State, 12345")]
        [InlineData("Street, City, State 123456")]
        public void IsAddressFormatValid_InvalidAddresses_ReturnsFalse(string invalidAddress)
        {
            // Act
            bool result = AddressUtility.IsAddressFormatValid(invalidAddress);

            // Assert
            Assert.False(result);
        }

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
