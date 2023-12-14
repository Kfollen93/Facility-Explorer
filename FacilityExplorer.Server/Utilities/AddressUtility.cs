using FacilityExplorer.Server.Models;
using System.Text.RegularExpressions;

namespace FacilityExplorer.Server.Utilities
{
    public static class AddressUtility
    {
        public static bool IsAddressFormatValid(string fullAddress)
        {
            var addressParts = fullAddress?.Trim().Split(',');
            if (addressParts == null || addressParts.Length != 3) return false;
            var stateZip = addressParts[2]?.Trim().Split(' ');
            return stateZip != null && stateZip.Length == 2 && Regex.IsMatch(stateZip[1], @"^\d{5}$");
        }

        public static Address CreateAddress(string fullAddress)
        {
            var addressParts = fullAddress.Trim().Split(',');
            var street = addressParts[0].Trim();
            var city = addressParts[1].Trim();
            var stateZip = addressParts[2].Trim().Split(' ');

            return new Address
            {
                Street = street,
                City = city,
                State = stateZip[0],
                Zipcode = stateZip[1]
            };
        }
    }
}
