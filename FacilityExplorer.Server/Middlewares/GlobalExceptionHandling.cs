using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace FacilityExplorer.Server.Middlewares
{
    public class GlobalExceptionHandling : IMiddleware
    {
        private readonly ILogger<GlobalExceptionHandling> _logger;

        public GlobalExceptionHandling(ILogger<GlobalExceptionHandling> logger) => _logger = logger;

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                LogException(context, ex);
                context.Response.ContentType = "application/json";

                context.Response.StatusCode = ex switch
                {
                    InvalidOperationException => (int)HttpStatusCode.BadRequest,
                    //SqlException => (int)HttpStatusCode.InternalServerError,
                    ValidationException => (int)HttpStatusCode.BadRequest,
                    _ => (int)HttpStatusCode.InternalServerError
                };

                var errorType = ex switch
                {
                    InvalidOperationException => "Invalid Operation",
                    //SqlException => "Database Error",
                    ValidationException => "Validation Error",
                    _ => "Internal Server Error"
                };

                await HandleExceptionAsync(context, ex.Message, errorType);
            }
        }

        private void LogException(HttpContext context, Exception ex)
        {
            // Get the user's name/email (if available).
            var userName = context.User.Identity?.Name ?? "Unknown Name";
            var userEmail = context.User.FindFirst(ClaimTypes.Email)?.Value ?? "Unknown Email";

            var logDetails = new
            {
                Method = context.Request.Method,
                Path = context.Request.Path,
                UserName = userName,
                UserEmail = userEmail,
                ErrorMessage = ex.Message,
                StackTrace = ex.StackTrace?.Split(new[] { "\n" }, StringSplitOptions.RemoveEmptyEntries).Take(3).Aggregate((current, next) => $"{current}\n{next}")
            };

            _logger.LogError("Exception occurred: {@LogDetails}", logDetails);
        }

        private static async Task HandleExceptionAsync(HttpContext context, string message, string errorType)
        {
            var problem = new ProblemDetails
            {
                Status = context.Response.StatusCode,
                Type = errorType,
                Detail = message
            };

            // Serialize and send the response
            var jsonProblem = JsonSerializer.Serialize(problem);
            await context.Response.WriteAsync(jsonProblem);
        }
    }
}
