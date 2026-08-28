# Run the site's Node toolchain through Docker Desktop.
#
# Node is not installed on this machine and Docker Desktop's CLI is not on PATH,
# so this wraps both. Everything runs against the repo as a bind mount, which
# means node_modules and dist land in the working tree exactly as a local build
# would leave them.
#
#   .\dev.ps1 build            astro build
#   .\dev.ps1 check            astro check
#   .\dev.ps1 install          npm install
#   .\dev.ps1 dev              dev server on http://localhost:4321
#   .\dev.ps1 run "npm ls"     any command inside the container

param(
    [Parameter(Position = 0)][string]$Task = "build",
    [Parameter(Position = 1)][string]$Command = ""
)

$ErrorActionPreference = "Stop"

$DockerBin = "C:\Users\waqas\AppData\Local\Programs\DockerDesktop\resources\bin"
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    if (Test-Path "$DockerBin\docker.exe") { $env:Path = "$DockerBin;$env:Path" }
    else { throw "docker.exe not found. Is Docker Desktop installed?" }
}

$Repo = $PSScriptRoot
$Image = "node:22-alpine"


function Invoke-InNode([string]$Sh, [string[]]$ExtraArgs = @()) {
    # Docker Desktop's embedded resolver does not reach the npm registry on this
    # machine: nslookup fails and npm dies with ETIMEDOUT after 80 seconds.
    # Pointing at public resolvers fixes it.
    $args = @("run", "--rm",
              "--dns", "8.8.8.8", "--dns", "1.1.1.1",
              "-v", "${Repo}:/app",
              "-w", "/app") + $ExtraArgs + @($Image, "sh", "-lc", $Sh)
    & docker @args
    if ($LASTEXITCODE -ne 0) { throw "command failed with exit code $LASTEXITCODE" }
}

# Add the Linux native binaries if they are not there yet (first run only).
# scripts/linux-natives.sh explains why npm install cannot be used for this.
function Initialize-Modules {
    $probe = & docker run --rm -v "${Repo}:/app" -w /app $Image sh -lc `
        "test -d node_modules/@rollup/rollup-linux-x64-musl && echo ok || echo missing"
    if ($probe -notmatch "ok") {
        Write-Host "adding Linux native binaries (first run only)..."
        Invoke-InNode "sh /app/scripts/linux-natives.sh"
    }
}

if ($Task -ne "install") { Initialize-Modules }

switch ($Task) {
    "build"   { Invoke-InNode "npm run build" }
    "check"   { Invoke-InNode "npx astro check" }
    "install" { Invoke-InNode "npm install --no-audit --no-fund" }
    "dev"     { Invoke-InNode "npm run dev -- --host 0.0.0.0" @("-p", "4321:4321") }
    "run"     {
        if (-not $Command) { throw "usage: .\dev.ps1 run '<command>'" }
        Invoke-InNode $Command
    }
    default   { throw "unknown task '$Task'. Use build, check, install, dev or run." }
}
