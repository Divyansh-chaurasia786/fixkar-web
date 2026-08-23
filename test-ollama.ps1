$key = "06802537ae0f4e8095d6b085498aa8a3.C2msXCOe0OxSw_0J7MR0Zk5Y"
$headers = @{ Authorization = "Bearer $key" }

# Test 1: api.ollama.com
Write-Host "=== Test api.ollama.com ===" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "https://api.ollama.com/v1/models" -Headers $headers -MaximumRedirection 5 -ErrorAction Stop
    Write-Host "Status: $($r.StatusCode)"
    Write-Host $r.Content.Substring(0, [Math]::Min(400, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Final URL: $($_.Exception.Response.ResponseUri)"
    }
}

# Test 2: ollama.ai
Write-Host ""
Write-Host "=== Test ollama.ai ===" -ForegroundColor Yellow
try {
    $r2 = Invoke-WebRequest -Uri "https://ollama.ai/api/chat" -Headers $headers -MaximumRedirection 5 -ErrorAction Stop
    Write-Host "Status: $($r2.StatusCode)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Final URL: $($_.Exception.Response.ResponseUri)"
    }
}
