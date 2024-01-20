using Microsoft.EntityFrameworkCore;
using FacilityExplorer.Server.Data;
using FacilityExplorer.Server.Repositories.FacilityRepository;
using FacilityExplorer.Server.Middlewares;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using FacilityExplorer.Server.Repositories.UserManagementRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IFacilityRepository, FacilityRepository>();
builder.Services.AddScoped<IUserManagementRepository, UserManagementRepository>();

builder.Services.AddTransient<GlobalExceptionHandling>();
builder.Services.AddLogging();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DataContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
        .WithOrigins("https://localhost:5173", "https://facilityexplorer.azurewebsites.net")
        .WithHeaders("Content-Type", "Authorization")
        .WithMethods("GET", "POST", "PUT", "DELETE", "PATCH");
    });
});

var app = builder.Build();

app.UseCors();
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<IdentityUser>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseMiddleware<GlobalExceptionHandling>();
app.MapControllers();
app.MapFallbackToFile("/index.html");

// Seed Database
using (var serviceScope = app.Services.CreateScope())
{
    await PopulateDummyData(serviceScope);
    await CreateRoles(serviceScope);
    await CreateAdminAccount(serviceScope);
}



app.Run();

static async Task CreateAdminAccount(IServiceScope serviceScope)
{
    var configuration = serviceScope.ServiceProvider.GetRequiredService<IConfiguration>();
    var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    var adminCredentials = configuration.GetSection("AdminCredentials");
    string email = adminCredentials["Email"]!;
    string password = adminCredentials["Password"]!;


    if (await userManager.FindByEmailAsync(email) == null)
    {
        var user = new IdentityUser()
        {
            UserName = email,
            Email = email,
        };

        await userManager.CreateAsync(user, password);
        await userManager.AddToRoleAsync(user, "Admin");
    }
}

static async Task CreateRoles(IServiceScope serviceScope)
{
    var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var roles = new[] { "Admin", "User" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

static async Task PopulateDummyData(IServiceScope serviceScope)
{
    var context = serviceScope.ServiceProvider.GetRequiredService<DataContext>();
    await DbSeeder.ClearData(context);
    await DbSeeder.SeedData(context);
}