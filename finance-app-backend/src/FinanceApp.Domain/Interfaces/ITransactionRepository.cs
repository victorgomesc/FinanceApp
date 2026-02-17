using FinanceApp.Domain.Entities;

namespace FinanceApp.Domain.Interfaces;

public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction);
    Task<List<Transaction>> GetAllAsync();
    Task<List<Transaction>> GetByPeriodAsync(DateTime start, DateTime end);
    Task<Transaction?> GetByIdAsync(Guid id);
    Task UpdateAsync(Transaction transaction);
}

