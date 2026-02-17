using FinanceApp.Domain.Common;

namespace FinanceApp.Domain.Entities;

public class Transaction
{
    public Guid Id { get; private set; }
    public string Description { get; private set; } = string.Empty;
    public decimal Amount { get; private set; }
    public TransactionType Type { get; private set; }
    public DateTime Date { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public string CreatedBy { get; private set; } = string.Empty;

    public DateTime? UpdatedAt { get; private set; }
    public string? UpdatedBy { get; private set; }

    public DateTime? DeletedAt { get; private set; }
    public string? DeletedBy { get; private set; }

    public bool IsDeleted { get; private set; }

    private Transaction() { }

    public Transaction(
        string description,
        decimal amount,
        TransactionType type,
        DateTime date,
        string createdBy)
    {
        if (amount <= 0)
            throw new DomainException("Amount must be greater than zero");

        Id = Guid.NewGuid();
        Description = description;
        Amount = amount;
        Type = type;
        Date = date;
        CreatedAt = DateTime.UtcNow;
        CreatedBy = createdBy;
        IsDeleted = false;
    }

    public void Update(
        string description,
        decimal amount,
        TransactionType type,
        DateTime date,
        string updatedBy)
    {
        if (amount <= 0)
            throw new DomainException("Amount must be greater than zero");

        Description = description;
        Amount = amount;
        Type = type;
        Date = date;

        UpdatedAt = DateTime.UtcNow;
        UpdatedBy = updatedBy;
    }

    public void Delete(string deletedBy)
    {
        IsDeleted = true;
        DeletedAt = DateTime.UtcNow;
        DeletedBy = deletedBy;
    }
}

