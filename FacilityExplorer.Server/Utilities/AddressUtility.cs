using FacilityExplorer.Server.Models;

namespace FacilityExplorer.Server.Utilities
{
    public static class AddressUtility
    {
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
