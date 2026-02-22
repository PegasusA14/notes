using Microsoft.Extensions.DependencyInjection;

namespace NotesApi.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection AddFrontendCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("FrontendCorsPolicy", policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials(); // Often needed if we ever use cookies, harmless otherwise
            });
        });

        return services;
    }
}
