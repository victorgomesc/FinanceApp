using Microsoft.EntityFrameworkCore;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Infrastructure.Data;

namespace FinanceApp.Infrastructure.Repositories;

public class TransactionRepository(AppDbContext context) : ITransactionRepository
{
    private readonly AppDbContext _context = context;

    public async Task AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Transaction>> GetAllAsync()
    => await _context.Transactions
        .Where(t => !t.IsDeleted)
        .ToListAsync();

    public async Task<List<Transaction>> GetByPeriodAsync(DateTime start, DateTime end)
        => await _context.Transactions
            .Where(t => t.Date >= start && t.Date <= end && !t.IsDeleted)
            .ToListAsync();

    public async Task<Transaction?> GetByIdAsync(Guid id)
    {
        return await _context.Transactions
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
    }

    public async Task UpdateAsync(Transaction transaction)
    {
        _context.Transactions.Update(transaction);
        await _context.SaveChangesAsync();
    }

}
