using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Domain.Common;
using FinanceApp.Application.DTOs;
using FinanceApp.Application.Settings;
using Microsoft.Extensions.Options;

namespace FinanceApp.Application.Services;

public class AuthService
{
    private readonly IUserRepository _repository;
    private readonly JwtSettings _jwtSettings;

    public AuthService(IUserRepository repository, IOptions<JwtSettings> jwtSettings)
    {
        _repository = repository;
        _jwtSettings = jwtSettings.Value;
    }

    public async Task RegisterAsync(RegisterDto dto)
    {
        var existing = await _repository.GetByEmailAsync(dto.Email);

        if (existing != null)
            throw new DomainException("Email already registered");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User(dto.Name, dto.Email, passwordHash);

        await _repository.AddAsync(user);
    }

    public async Task<string> LoginAsync(LoginDto dto)
    {
        var user = await _repository.GetByEmailAsync(dto.Email);

        if (user is null)
            throw new DomainException("Invalid credentials");

        var valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

        if (!valid)
            throw new DomainException("Invalid credentials");

        return GenerateJwt(user);
    }

    private string GenerateJwt(User user)
{
    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim("name", user.Name)
    };

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(_jwtSettings.Key));

    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: _jwtSettings.Issuer,
        audience: _jwtSettings.Audience,
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: creds);

    return new JwtSecurityTokenHandler().WriteToken(token);
}

}
