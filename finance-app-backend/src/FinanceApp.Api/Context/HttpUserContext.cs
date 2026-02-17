using System.Security.Claims;
using FinanceApp.Application.Common;

namespace FinanceApp.Api.Context;

public class HttpUserContext(IHttpContextAccessor httpContextAccessor) : IUserContext
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public string GetUserEmail()
{
    return _httpContextAccessor.HttpContext?
        .User?
        .FindFirst(ClaimTypes.Email)?.Value
        ?? throw new UnauthorizedAccessException();
}

}
