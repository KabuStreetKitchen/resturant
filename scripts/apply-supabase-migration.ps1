[CmdletBinding()]
param(
  [string]$ProjectRef = "paygfyrermttfnqqyvyg",
  [switch]$Apply
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$migrationPath = Join-Path $repositoryRoot "supabase\migrations\20260717150000_restaurant_content_reliability.sql"

if (-not (Test-Path -LiteralPath $migrationPath)) {
  throw "Migration file not found: $migrationPath"
}

$installedCli = Get-Command supabase -ErrorAction SilentlyContinue

function Invoke-SupabaseCli {
  param([string[]]$CliArguments)

  if ($installedCli) {
    & $installedCli.Source @CliArguments
  } else {
    & npx --yes supabase @CliArguments
  }

  if ($LASTEXITCODE -ne 0) {
    throw "Supabase command failed: supabase $($CliArguments -join ' ')"
  }
}

Push-Location $repositoryRoot
try {
  Write-Host "Migration: $migrationPath"
  Write-Host "Project:   $ProjectRef"

  Invoke-SupabaseCli @("link", "--project-ref", $ProjectRef)
  Invoke-SupabaseCli @("migration", "list")
  Invoke-SupabaseCli @("db", "push", "--dry-run")

  if (-not $Apply) {
    Write-Host ""
    Write-Host "Dry run completed. No database changes were applied."
    Write-Host "Run again with -Apply to push the migration:"
    Write-Host "  .\scripts\apply-supabase-migration.ps1 -Apply"
    exit 0
  }

  Invoke-SupabaseCli @("db", "push")
  Write-Host "Supabase migration applied successfully."
} finally {
  Pop-Location
}
