using FacilityExplorer.Server.Models;

namespace FacilityExplorer.Server.Data
{
    public static class DbSeeder
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Facilities.Any())
            {
                context.Facilities.AddRange(
                new Facility()
                {
                    Name = "Seattle Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "123 Main St", City = "Seattle", State = "WA", Zipcode = "98101" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "206-555-1234",
                    WebsiteUrl = "www.seattlemh.com",
                    Description = "A mental health facility in Seattle.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Kitsap Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "456 Oak St", City = "Kitsap", State = "WA", Zipcode = "98312" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.kitsapmh.com",
                    Description = "A mental health facility in Kitsap.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Bellevue Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "456 Oak St", City = "Bellevue", State = "WA", Zipcode = "98311" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.bell.com",
                    Description = "A mental health facility in Bellevue.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Kitsap Skilled Nursing",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "456 Oak St", City = "Kitsap", State = "WA", Zipcode = "98312" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.kitsapmh.com",
                    Description = "A skilled nursing facility in Kitsap.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                 new Facility()
                 {
                     Name = "Seattle Skilled Nursing",
                     TypeOfFacility = "SNF",
                     Address = new Address { Street = "123 Main St", City = "Seattle", State = "WA", Zipcode = "98101" },
                     Hours = "9 AM - 5 PM",
                     PhoneNumber = "206-555-1234",
                     WebsiteUrl = "www.seattlemh.com",
                     Description = "A skilled nursing  facility in Seattle.",
                     Insurance = "Bluecross",
                     Payment = "Sliding Scale"
                 },
                new Facility()
                {
                    Name = "Bellevue Skilled Nursing",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "456 Oak St", City = "Bellevue", State = "WA", Zipcode = "98312" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.bellevue.com",
                    Description = "A skilled nursing facility in Bellevue.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Kitsap Longterm",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "456 Oak St", City = "Kitsap", State = "WA", Zipcode = "98312" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.kitsapmh.com",
                    Description = "A Longterm facility in Kitsap.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Seattle Longterm",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "456 Oak St", City = "Seattle", State = "WA", Zipcode = "98312" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.kitsapmh.com",
                    Description = "A Longterm facility in Seattle.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Everett Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "789 Elm St", City = "Everett", State = "WA", Zipcode = "98201" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "425-555-5678",
                    WebsiteUrl = "www.everettmh.com",
                    Description = "A mental health facility in Everett.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Tacoma Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "567 Pine St", City = "Tacoma", State = "WA", Zipcode = "98401" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "253-555-6789",
                    WebsiteUrl = "www.tacomamh.com",
                    Description = "A mental health facility in Tacoma.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Bellevue Senior Living",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "789 Oak St", City = "Bellevue", State = "WA", Zipcode = "98004" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "425-555-7890",
                    WebsiteUrl = "www.bellevuesnf.com",
                    Description = "A skilled nursing facility in Bellevue.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Olympia Senior Living",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "345 Cedar St", City = "Olympia", State = "WA", Zipcode = "98501" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "360-555-8901",
                    WebsiteUrl = "www.olympiasnf.com",
                    Description = "A skilled nursing facility in Olympia.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Renton Assisted Living",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "123 Maple St", City = "Renton", State = "WA", Zipcode = "98055" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "425-555-9012",
                    WebsiteUrl = "www.rentonltc.com",
                    Description = "A Longterm care facility in Renton.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Bellingham Assisted Living",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "789 Birch St", City = "Bellingham", State = "WA", Zipcode = "98225" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "360-555-0123",
                    WebsiteUrl = "www.bellinghamltc.com",
                    Description = "A Longterm care facility in Bellingham.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Spokane Mental Wellness",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "567 Pine St", City = "Spokane", State = "WA", Zipcode = "99201" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "509-555-3456",
                    WebsiteUrl = "www.spokanemh.com",
                    Description = "A mental health facility in Spokane.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Redmond Mental Health",
                    TypeOfFacility = "MH",
                    Address = new Address { Street = "890 Cedar St", City = "Redmond", State = "WA", Zipcode = "98052" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "425-555-4567",
                    WebsiteUrl = "www.redmondmh.com",
                    Description = "A mental health facility in Redmond.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Yakima Skilled Nursing",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "123 Oak St", City = "Yakima", State = "WA", Zipcode = "98901" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "509-555-5678",
                    WebsiteUrl = "www.yakimaskillednursing.com",
                    Description = "A skilled nursing facility in Yakima.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Federal Way Skilled Nursing",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "456 Birch St", City = "Federal Way", State = "WA", Zipcode = "98003" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "253-555-6789",
                    WebsiteUrl = "www.federalwaysnf.com",
                    Description = "A skilled nursing facility in Federal Way.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Kent Longterm Care",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "789 Elm St", City = "Kent", State = "WA", Zipcode = "98030" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "253-555-7890",
                    WebsiteUrl = "www.kentltc.com",
                    Description = "A Longterm care facility in Kent.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Richland Longterm Care",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "345 Cedar St", City = "Richland", State = "WA", Zipcode = "99352" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "509-555-8901",
                    WebsiteUrl = "www.richlandltc.com",
                    Description = "A Longterm care facility in Richland.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Evergreen SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "123 Pine St", City = "Evergreen", State = "WA", Zipcode = "98001" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "253-555-1234",
                    WebsiteUrl = "www.evergreensnf.com",
                    Description = "A skilled nursing facility in Evergreen.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Cascade SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "456 Cedar St", City = "Cascade", State = "WA", Zipcode = "98002" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "425-555-5678",
                    WebsiteUrl = "www.cascadesnf.com",
                    Description = "A skilled nursing facility in Cascade.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Mountain Vista SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "789 Oak St", City = "Mountain Vista", State = "WA", Zipcode = "98003" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "360-555-7890",
                    WebsiteUrl = "www.mountainvistasnf.com",
                    Description = "A skilled nursing facility in Mountain Vista.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Riverside SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "101 Pine St", City = "Riverside", State = "WA", Zipcode = "98004" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "425-555-0123",
                    WebsiteUrl = "www.riversidesnf.com",
                    Description = "A skilled nursing facility in Riverside.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Maplewood SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "345 Cedar St", City = "Maplewood", State = "WA", Zipcode = "98005" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "253-555-2345",
                    WebsiteUrl = "www.maplewoodsnf.com",
                    Description = "A skilled nursing facility in Maplewood.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Greenfield SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "567 Oak St", City = "Greenfield", State = "WA", Zipcode = "98006" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "360-555-3456",
                    WebsiteUrl = "www.greenfieldsnf.com",
                    Description = "A skilled nursing facility in Greenfield.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Hilltop SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "789 Elm St", City = "Hilltop", State = "WA", Zipcode = "98007" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "425-555-5678",
                    WebsiteUrl = "www.hilltopsnf.com",
                    Description = "A skilled nursing facility in Hilltop.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Valleyview SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "123 Oak St", City = "Valleyview", State = "WA", Zipcode = "98008" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "253-555-7890",
                    WebsiteUrl = "www.valleyviewsnf.com",
                    Description = "A skilled nursing facility in Valleyview.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Sunrise SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "456 Pine St", City = "Sunrise", State = "WA", Zipcode = "98009" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "360-555-0123",
                    WebsiteUrl = "www.sunrisesnf.com",
                    Description = "A skilled nursing facility in Sunrise.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Cedarwood SNF",
                    TypeOfFacility = "SNF",
                    Address = new Address { Street = "789 Oak St", City = "Cedarwood", State = "WA", Zipcode = "98010" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "425-555-2345",
                    WebsiteUrl = "www.cedarwoodsnf.com",
                    Description = "A skilled nursing facility in Cedarwood.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Meadow LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "123 Pine St", City = "Meadow", State = "WA", Zipcode = "98101" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "206-555-1234",
                    WebsiteUrl = "www.meadowlife.com",
                    Description = "A Longterm care facility in Meadow.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Woodland LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "456 Oak St", City = "Woodland", State = "WA", Zipcode = "98102" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.woodlandltc.com",
                    Description = "A Longterm care facility in Woodland.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Golden Acres LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "789 Elm St", City = "Golden Acres", State = "WA", Zipcode = "98103" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "206-555-3456",
                    WebsiteUrl = "www.goldenacresltc.com",
                    Description = "A Longterm care facility in Golden Acres.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Pineview LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "101 Cedar St", City = "Pineview", State = "WA", Zipcode = "98104" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "206-555-4567",
                    WebsiteUrl = "www.pineviewltc.com",
                    Description = "A Longterm care facility in Pineview.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Riverfront LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "345 Oak St", City = "Riverfront", State = "WA", Zipcode = "98105" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-5678",
                    WebsiteUrl = "www.riverfrontltc.com",
                    Description = "A Longterm care facility in Riverfront.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Sunset LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "567 Pine St", City = "Sunset", State = "WA", Zipcode = "98106" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "206-555-6789",
                    WebsiteUrl = "www.sunsetltc.com",
                    Description = "A Longterm care facility in Sunset.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Maplewood LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "789 Cedar St", City = "Maplewood", State = "WA", Zipcode = "98107" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "206-555-7890",
                    WebsiteUrl = "www.maplewoodltc.com",
                    Description = "A Longterm care facility in Maplewood.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Valleyview LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "123 Oak St", City = "Valleyview", State = "WA", Zipcode = "98108" },
                    Hours = "10 AM - 6 PM",
                    PhoneNumber = "206-555-9012",
                    WebsiteUrl = "www.valleyviewltc.com",
                    Description = "A Longterm care facility in Valleyview.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Cedar Ridge LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "456 Elm St", City = "Cedar Ridge", State = "WA", Zipcode = "98109" },
                    Hours = "8 AM - 4 PM",
                    PhoneNumber = "206-555-0123",
                    WebsiteUrl = "www.cedarridgeltc.com",
                    Description = "A Longterm care facility in Cedar Ridge.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                },
                new Facility()
                {
                    Name = "Hillcrest LTC",
                    TypeOfFacility = "LTC",
                    Address = new Address { Street = "789 Pine St", City = "Hillcrest", State = "WA", Zipcode = "98110" },
                    Hours = "9 AM - 5 PM",
                    PhoneNumber = "206-555-2345",
                    WebsiteUrl = "www.hillcrestltc.com",
                    Description = "A Longterm care facility in Hillcrest.",
                    Insurance = "Bluecross",
                    Payment = "Sliding Scale"
                }
                );

                context.SaveChanges();
            }
        }

        public static void ClearData(DataContext context)
        {
            context.Facilities.RemoveRange(context.Facilities);
            context.SaveChanges();
        }
    }
}
