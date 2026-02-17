using Microsoft.AspNetCore.Mvc;
using FinanceApp.Application.DTOs;
using FinanceApp.Application.Services;
using Microsoft.AspNetCore.Authorization;

namespace FinanceApp.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService service) : ControllerBase
{
    private readonly AuthService _service = service;

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        await _service.RegisterAsync(dto);
        return Ok(new { message = "User created successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var token = await _service.LoginAsync(dto);
        return Ok(new { token });
    }
}
