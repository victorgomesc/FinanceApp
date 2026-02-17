using FinanceApp.Application.Common;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Application.DTOs;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Common;

namespace FinanceApp.Application.Services;

public class TransactionService(
    ITransactionRepository repository,
    IUserContext userContext)
{
    private readonly ITransactionRepository _repository = repository;
    private readonly IUserContext _userContext = userContext;

    public async Task CreateAsync(TransactionDto dto)
    {
        var email = _userContext.GetUserEmail();

        var transaction = new Transaction(
            dto.Description,
            dto.Amount,
            (TransactionType)dto.Type,
            dto.Date,
            email
        );

        await _repository.AddAsync(transaction);
    }

    public async Task UpdateAsync(Guid id, TransactionDto dto)
    {
        var transaction = await _repository.GetByIdAsync(id)
            ?? throw new DomainException("Transaction not found");

        transaction.Update(
            dto.Description,
            dto.Amount,
            (TransactionType)dto.Type,
            dto.Date,
            _userContext.GetUserEmail()
        );

        await _repository.UpdateAsync(transaction);
    }

    public async Task DeleteAsync(Guid id)
    {
        var transaction = await _repository.GetByIdAsync(id)
            ?? throw new DomainException("Transaction not found");

        transaction.Delete(_userContext.GetUserEmail());

        await _repository.UpdateAsync(transaction);
    }

    public async Task<List<Transaction>> GetAllAsync()
    {
        var userEmail = _userContext.GetUserEmail();

        var transactions = await _repository.GetAllAsync();

        return [.. transactions.Where(t => !t.IsDeleted && t.CreatedBy == userEmail)];
    }

    public async Task<List<Transaction>> GetByPeriodAsync(DateTime start, DateTime end)
    {
        var userEmail = _userContext.GetUserEmail();

        var startUtc = DateTime.SpecifyKind(start, DateTimeKind.Utc);
        var endUtc = DateTime.SpecifyKind(end, DateTimeKind.Utc);

        var transactions = await _repository.GetByPeriodAsync(startUtc, endUtc);

        return transactions
            .Where(t => !t.IsDeleted && t.CreatedBy == userEmail)
            .ToList();
    }


    public async Task<object> GetMonthlySummaryAsync()
    {
        var userEmail = _userContext.GetUserEmail();

        var transactions = await _repository.GetAllAsync();

        var summary = transactions
            .Where(t => !t.IsDeleted && t.CreatedBy == userEmail)
            .GroupBy(t => new { t.Date.Year, t.Date.Month })
            .Select(g => new
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                TotalIncome = g
                    .Where(x => x.Type == TransactionType.Income)
                    .Sum(x => x.Amount),
                TotalExpense = g
                    .Where(x => x.Type == TransactionType.Expense)
                    .Sum(x => x.Amount)
            })
            .OrderBy(x => x.Year)
            .ThenBy(x => x.Month);

        return summary;
    }
}
