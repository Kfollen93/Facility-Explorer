using Microsoft.EntityFrameworkCore;
using FacilityExplorer.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace FacilityExplorer.Server.Data
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Facility> Facilities => Set<Facility>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Facility>()
                .OwnsOne(f => f.Address);

            base.OnModelCreating(modelBuilder);
        }
    }
}
