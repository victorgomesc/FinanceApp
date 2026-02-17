using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FinanceApp.Application.Services;
using FinanceApp.Application.DTOs;

namespace FinanceApp.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TransactionsController(
    TransactionService service,
    PdfReportService pdfReportService
) : ControllerBase
{
    private readonly TransactionService _service = service;
    private readonly PdfReportService _pdfReportService = pdfReportService;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TransactionDto dto)
    {
        await _service.CreateAsync(dto);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("period")]
    public async Task<IActionResult> GetByPeriod(
        [FromQuery] DateTime start,
        [FromQuery] DateTime end)
    {
        var result = await _service.GetByPeriodAsync(start, end);
        return Ok(result);
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var result = await _service.GetMonthlySummaryAsync();
        return Ok(result);
    }

    [HttpGet("report/pdf")]
    public async Task<IActionResult> ExportPdf(
        [FromQuery] DateTime start,
        [FromQuery] DateTime end)
    {
        var pdfBytes =
            await _pdfReportService.GenerateReportAsync(start, end);

        return File(
            pdfBytes,
            "application/pdf",
            "relatorio-financeiro.pdf");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] TransactionDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
