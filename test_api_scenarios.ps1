Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "TESTING WEBSITE SPECIALIST & LANGUAGE ROUTING" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Language onboarding selection
Write-Host "Scenario 1: User selects '🗣️ Hinglish' at start" -ForegroundColor Yellow
$body1 = @{
    prompt = "🗣️ Hinglish"
    history = @(
        [PSCustomObject]@{ sender = "agent"; text = "Welcome... select your preferred language..." }
    )
    context = @{}
} | ConvertTo-Json -Depth 5

$res1 = Invoke-RestMethod -Uri "http://localhost:5050/api/chat" -Method POST -ContentType "application/json" -Body $body1
Write-Host "REPLY: $($res1.reply)" -ForegroundColor White
Write-Host "EXTRACTED LANG: $($res1.updatedContext.preferredLanguage)" -ForegroundColor Green
Write-Host "----------------------------------------------" -ForegroundColor Gray

# Test 2: Off-topic negative boundary check
Write-Host "Scenario 2: User asks off-topic question: 'Should I hire a marketing manager?'" -ForegroundColor Yellow
$body2 = @{
    prompt = "Should I hire a marketing manager?"
    history = @()
    context = @{ preferredLanguage = "english" }
} | ConvertTo-Json -Depth 5

$res2 = Invoke-RestMethod -Uri "http://localhost:5050/api/chat" -Method POST -ContentType "application/json" -Body $body2
Write-Host "REPLY: $($res2.reply)" -ForegroundColor White
Write-Host "----------------------------------------------" -ForegroundColor Gray

# Test 3: Website specific diagnosis & scope
Write-Host "Scenario 3: Complete Website Planner context" -ForegroundColor Yellow
$body3 = @{
    prompt = "I run a dental clinic in Noida, patients booking issue is there, budget is 10000"
    history = @()
    context = @{ preferredLanguage = "english" }
} | ConvertTo-Json -Depth 5

$res3 = Invoke-RestMethod -Uri "http://localhost:5050/api/chat" -Method POST -ContentType "application/json" -Body $body3
Write-Host "REPLY: $($res3.reply)" -ForegroundColor White
Write-Host "NECESSITY: $($res3.recommendation.websiteNeeded)" -ForegroundColor Green
Write-Host "TYPE: $($res3.recommendation.website.type)" -ForegroundColor Green
Write-Host "PAGES: $($res3.recommendation.pages -join ', ')" -ForegroundColor Green
Write-Host "FEATURES: $($res3.recommendation.features -join ', ')" -ForegroundColor Green
Write-Host "AVOID: $($res3.recommendation.avoid -join ', ')" -ForegroundColor Red
Write-Host "==============================================" -ForegroundColor Cyan
