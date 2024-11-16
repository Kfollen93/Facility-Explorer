using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace FacilityExplorer.Server.Middlewares
{
    public class GlobalExceptionHandling : IMiddleware
    {
        private readonly ILogger _logger;
        public GlobalExceptionHandling(ILogger<GlobalExceptionHandling> logger) => _logger = logger;

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception: {ex.Message}, StackTrace: {ex.StackTrace}");
                context.Response.ContentType = "application/json";

                switch (ex)
                {
                    case InvalidOperationException invalidOpEx:
                        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        await HandleExceptionAsync(context, invalidOpEx.Message, "Invalid Operation");
                        break;

                    default:
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        await HandleExceptionAsync(context, "An internal server error has occurred.", "Internal Server Error");
                        break;
                }
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, string message, string errorType)
        {
            ProblemDetails problem = new()
            {
                Status = context.Response.StatusCode,
                Type = errorType,
                Detail = message
            };

            string jsonProblem = JsonSerializer.Serialize(problem);
            await context.Response.WriteAsync(jsonProblem);
        }
    }
}
