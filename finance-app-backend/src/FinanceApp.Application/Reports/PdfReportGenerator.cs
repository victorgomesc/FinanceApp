using FinanceApp.Domain.Entities;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace FinanceApp.Application.Reports;

public static class PdfReportGenerator
{
    public static byte[] Generate(
        List<Transaction> transactions,
        DateTime start,
        DateTime end)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        var totalIncome = transactions
            .Where(t => t.Type == TransactionType.Income)
            .Sum(t => t.Amount);

        var totalExpense = transactions
            .Where(t => t.Type == TransactionType.Expense)
            .Sum(t => t.Amount);

        var balance = totalIncome - totalExpense;

        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(40);

                page.Header()
                    .Text("Relatório Financeiro")
                    .FontSize(20)
                    .Bold();

                page.Content().Column(col =>
                {
                    col.Spacing(10);

                    col.Item().Text(
                        $"Período: {start:dd/MM/yyyy} - {end:dd/MM/yyyy}");

                    col.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        table.Header(header =>
                        {
                            header.Cell().Text("Descrição").Bold();
                            header.Cell().Text("Valor").Bold();
                            header.Cell().Text("Tipo").Bold();
                            header.Cell().Text("Data").Bold();
                        });

                        foreach (var t in transactions)
                        {
                            table.Cell().Text(t.Description);
                            table.Cell().Text($"R$ {t.Amount:N2}");
                            table.Cell().Text(
                                t.Type == TransactionType.Income
                                    ? "Receita"
                                    : "Despesa");
                            table.Cell().Text(t.Date.ToString("dd/MM/yyyy"));
                        }
                    });

                    col.Item().PaddingTop(20);

                    col.Item().Text($"Total Receitas: R$ {totalIncome:N2}");
                    col.Item().Text($"Total Despesas: R$ {totalExpense:N2}");
                    col.Item().Text($"Saldo: R$ {balance:N2}")
                        .Bold();
                });
            });
        }).GeneratePdf();
    }
}
