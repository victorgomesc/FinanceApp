namespace FinanceApp.Application.DTOs;

public record TransactionDto(
    string Description,
    decimal Amount,
    int Type,
    DateTime Date
);
