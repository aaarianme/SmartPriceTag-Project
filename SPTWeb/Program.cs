
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SPTWeb.Authentications;
using SPTWeb.AzureStorage;
using SPTWeb.Interfaces;
using SPTWeb.Repository;
using SPTWeb.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = AuthTokenGenerator.Issuer,
        ValidAudience = AuthTokenGenerator.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthTokenGenerator.IssuerSigningKey)),
    };
    options.Events = new JwtBearerEvents { OnMessageReceived = (context) => { context.Token = context.Request.Cookies["auth"]; return Task.CompletedTask; } };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("client", policy => policy.RequireAuthenticatedUser().RequireRole("client"));

});

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

#region Dependency Injection AddScoped
builder.Services.AddScoped<IAuthServices, AuthServices>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IClientServices, ClientServices>();
builder.Services.AddScoped<IStoreServices, StoreServices>();
builder.Services.AddScoped<IStoreRepository, StoreRepository>();
builder.Services.AddScoped<IAzureStorageManager, AzureStorageManager>();
builder.Services.AddScoped<IItemsSerivces, ItemsServices>();
builder.Services.AddScoped<IItemsRepository, ItemsRepository>();
builder.Services.AddScoped<IItemsImagesRepository, ItemImagesRepository>();
builder.Services.AddScoped<ICampaignRepository, CampaignRepository>();
builder.Services.AddScoped<ICampaignsServices, CampaignsServices>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
//app.UseCors(op=>op.AllowAnyHeader().AllowAnyMethod().AllowCredentials().SetIsOriginAllowed(a=>true).WithOrigins(""));
app.UseCors(builder => builder
       .AllowAnyHeader()
       .AllowAnyMethod()
       .WithOrigins("https://sptwebapp.azurewebsites.net", "https://localhost:44412").AllowCredentials()
    ) ;
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html"); ;
app.UseDeveloperExceptionPage();



app.Run();
