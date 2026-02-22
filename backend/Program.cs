using Microsoft.EntityFrameworkCore;
using NotesApi.Data;
using NotesApi.Extensions;
using NotesApi.Services;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// Register AppDbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();

builder.Services.AddFrontendCors();

builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddScoped<JwtService>();

var app = builder.Build();

app.UseCors("FrontendCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
