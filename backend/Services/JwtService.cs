using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using NotesApi.Models;

namespace NotesApi.Services;

public class JwtService(IConfiguration config)
{
    private readonly IConfiguration _config = config;

    public string GenerateToken(User user)
    {
        var secret = _config["JwtSettings:Secret"];
        var issuer = _config["JwtSettings:Issuer"];
        var audience = _config["JwtSettings:Audience"];
        var expires = int.Parse(_config["JwtSettings:ExpiresInDays"]!);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
        };

        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims,
            expires: DateTime.UtcNow.AddDays(expires)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}