using Microsoft.EntityFrameworkCore;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<User> Users => Set<User>();


    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
