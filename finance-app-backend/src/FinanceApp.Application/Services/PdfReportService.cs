using FinanceApp.Application.Reports;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Application.Common;

namespace FinanceApp.Application.Services;

public class PdfReportService(
    ITransactionRepository repository,
    IUserContext userContext)
{
    private readonly ITransactionRepository _repository = repository;
    private readonly IUserContext _userContext = userContext;

    public async Task<byte[]> GenerateReportAsync(
        DateTime start,
        DateTime end)
    {
        var userEmail = _userContext.GetUserEmail();

        var startUtc = DateTime.SpecifyKind(start, DateTimeKind.Utc);
        var endUtc = DateTime.SpecifyKind(end, DateTimeKind.Utc);

        var transactions = await _repository
            .GetByPeriodAsync(startUtc, endUtc);

        var filtered = transactions
            .Where(t => !t.IsDeleted && t.CreatedBy == userEmail)
            .ToList();

        return PdfReportGenerator.Generate(filtered, start, end);
    }
}
