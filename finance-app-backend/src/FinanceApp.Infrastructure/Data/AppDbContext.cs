using Microsoft.EntityFrameworkCore;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<User> Users => Set<User>();
}
