using System.Net;
using System.Text.Json;
using FinanceApp.Domain.Common;

namespace FinanceApp.Api.Middlewares;

public class ExceptionMiddleware(
    RequestDelegate next,
    ILogger<ExceptionMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionMiddleware> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (DomainException ex)
        {
            await HandleExceptionAsync(context, ex.Message, HttpStatusCode.BadRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception occurred");

            await HandleExceptionAsync(
                context,
                "An unexpected error occurred.",
                HttpStatusCode.InternalServerError);
        }
    }

    private static Task HandleExceptionAsync(
        HttpContext context,
        string message,
        HttpStatusCode statusCode)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var response = new
        {
            success = false,
            message,
            errors = (object?)null
        };

        var json = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(json);
    }
}
