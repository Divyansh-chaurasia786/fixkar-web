[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Continue"

function Invoke-Chat {
    param([string]$label, [string]$prompt)
    Write-Host "=== $label ===" -ForegroundColor Cyan
    $body = @{ prompt = $prompt; history = @(); context = @{} } | ConvertTo-Json -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
    try {
        $r = Invoke-RestMethod -Uri "http://localhost:5050/api/chat" -Method POST `
             -ContentType "application/json; charset=utf-8" -Body $bytes
        Write-Host "REPLY:    $($r.reply)"
        Write-Host "STATE:    $($r.currentState)"
        Write-Host "INDUSTRY: $($r.updatedContext.business.industry)"
        Write-Host "LOCATION: $($r.updatedContext.business.location)"
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

Invoke-Chat "TEST 1 - coaching short"          "coaching"
Invoke-Chat "TEST 2 - mobile shop + Hyderabad" "I have a mobile shop in Hyderabad and want to sell phones online"
Invoke-Chat "TEST 3 - off-topic GST"           "how do I calculate GST for my products"
Invoke-Chat "TEST 4 - Hindi selection"         "Hindi"
Invoke-Chat "TEST 5 - dental clinic Hinglish"  "mera dental clinic hai Pune mein"
Invoke-Chat "TEST 6 - budget ambiguity"        "my budget is 300"
Invoke-Chat "TEST 7 - restaurant booking"      "I run a restaurant in Bangalore, want customers to book tables online"
