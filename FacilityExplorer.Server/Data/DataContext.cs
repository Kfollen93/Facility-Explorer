using Microsoft.EntityFrameworkCore;
using FacilityExplorer.Server.Models;

namespace FacilityExplorer.Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
        }

        public DbSet<Facility> Facilities => Set<Facility>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Facility>()
                .OwnsOne(f => f.Address);

            base.OnModelCreating(modelBuilder);
        }
    }
}
