
using Microsoft.AspNetCore.Authentication;
using SPTWeb.Interfaces;
using SPTWeb.Repository;
using SPTWeb.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

#region Dependency Injection AddScoped
builder.Services.AddScoped<IAuthServices, AuthServices>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

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

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


app.Run();
