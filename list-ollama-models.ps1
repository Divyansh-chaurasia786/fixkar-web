$key = "06802537ae0f4e8095d6b085498aa8a3.C2msXCOe0OxSw_0J7MR0Zk5Y"
$headers = @{ Authorization = "Bearer $key" }

Write-Host "=== Listing available Ollama cloud models ===" -ForegroundColor Yellow
try {
    $r = Invoke-RestMethod -Uri "https://ollama.com/v1/models" -Headers $headers -ErrorAction Stop
    $r.data | ForEach-Object { Write-Host "  Model: $($_.id)" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    # Try the native endpoint
    try {
        $r2 = Invoke-RestMethod -Uri "https://ollama.com/api/tags" -Headers $headers -ErrorAction Stop
        Write-Host "Native tags response:"
        $r2 | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "Native also failed: $($_.Exception.Message)"
    }
}
