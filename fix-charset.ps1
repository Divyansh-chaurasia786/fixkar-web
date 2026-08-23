$content = Get-Content server.cjs -Raw -Encoding UTF8
$fixed = $content -replace "'Content-Type': 'application/json'", "'Content-Type': 'application/json; charset=utf-8'"
[System.IO.File]::WriteAllText("$PWD\server.cjs", $fixed, [System.Text.Encoding]::UTF8)
Write-Host "Done. Verifying..."
Select-String -Path server.cjs -Pattern "Content-Type.*application/json" | Select-Object LineNumber, Line
