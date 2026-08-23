Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "TESTING COMPLETE CONSULTATION FLOW TO RECOMMENDATION" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# Turn 1: User mentions clinic and appointments
$body1 = @{
    prompt = "I run a dental clinic in Lucknow and need more appointments"
    history = @()
    context = @{}
} | ConvertTo-Json -Depth 5
$res1 = Invoke-RestMethod -Uri "http://localhost:5050/api/chat" -Method POST -ContentType "application/json" -Body $body1

# Turn 2: User answers qualifying questions
# We simulate history: User prompt -> AI reply -> New User response
$history = @(
    [PSCustomObject]@{ sender = "user"; text = "I run a dental clinic in Lucknow and need more appointments" }
    [PSCustomObject]@{ sender = "agent"; text = $res1.reply }
)

$body2 = @{
    prompt = "No, I don't have any website. Just a Google maps listing. I want to make it easy for local patient searches to book online. Budget is around 8000."
    history = $history
    context = $res1.updatedContext
} | ConvertTo-Json -Depth 5

$res2 = Invoke-RestMethod -Uri "http://localhost:5050/api/chat" -Method POST -ContentType "application/json" -Body $body2
Write-Host "REPLY: $($res2.reply)" -ForegroundColor White
Write-Host "STATE: $($res2.currentState)" -ForegroundColor Green
Write-Host "WEBSITE NEEDED: $($res2.recommendation.websiteNeeded)" -ForegroundColor Green
Write-Host "RECOMMENDED TYPE: $($res2.recommendation.type)" -ForegroundColor Green
Write-Host "RECOMMENDED PAGES: $($res2.recommendation.pages -join ', ')" -ForegroundColor Green
Write-Host "RECOMMENDED FEATURES: $($res2.recommendation.features -join ', ')" -ForegroundColor Green
Write-Host "REASON: $($res2.recommendation.reason)" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan
