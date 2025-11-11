param(
    [string]$EnvFile = ".env.build",
    [string]$Tag = "latest",
    [string]$ImageName = "andru4ort/ferreteria-app"
)

function Test-EnvFile {
    param([string]$FilePath)
    
    if (-Not (Test-Path $FilePath)) {
        Write-Host "No hay archivo .env: $FilePath" -ForegroundColor Red
        exit 1
    }
}

function Get-EnvVariables {
    param([string]$FilePath)
    
    return Get-Content $FilePath | Where-Object { $_ -and ($_ -notmatch '^\s*#') }
}

function Build-DockerArgs {
    param([array]$EnvLines)
    
    $buildArgs = @()
    foreach ($line in $EnvLines) {
        if ($line -match '^(.*?)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            $buildArgs += "--build-arg `"$key=$value`""
        }
    }
    return $buildArgs
}

function Show-EnvVariables {
    param(
        [string]$FilePath,
        [array]$EnvLines
    )
    
    Write-Host "`nVariables en ${FilePath}:" -ForegroundColor Cyan
    foreach ($line in $EnvLines) {
        if ($line -match '^(.*?)=') {
            Write-Host "  $($matches[1])"
        }
    }
}

function Build-DockerCommand {
    param(
        [array]$BuildArgs,
        [string]$Image,
        [string]$Tag
    )
    
    return "docker buildx build " + ($BuildArgs -join ' ') + " -t ${Image}:${Tag} ."
}

function Show-CommandPreview {
    param([string]$Command)
    
    Write-Host "`nComando a ejecutar:" -ForegroundColor Green
    Write-Host $Command -ForegroundColor Yellow
}

function Wait-UserConfirmation {
    Write-Host "`nPresiona ENTER para continuar o Ctrl+C para cancelar..." -ForegroundColor Magenta
    Read-Host
}

function Invoke-DockerBuild {
    param(
        [string]$Command,
        [string]$Image,
        [string]$Tag
    )
    
    Write-Host "`nEjecutando build..." -ForegroundColor Green
    Invoke-Expression $Command
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Build completado exitosamente: ${Image}:${Tag}" -ForegroundColor Green
    } else {
        Write-Host "`n✗ Build falló con código de salida: $LASTEXITCODE" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}



# Proceso principal

Test-EnvFile -FilePath $EnvFile

$envLines = Get-EnvVariables -FilePath $EnvFile

$buildArgs = Build-DockerArgs -EnvLines $envLines

Show-EnvVariables -FilePath $EnvFile -EnvLines $envLines

$command = Build-DockerCommand -BuildArgs $buildArgs -Image $ImageName -Tag $Tag

Show-CommandPreview -Command $command

Wait-UserConfirmation

Invoke-DockerBuild -Command $command -Image $ImageName -Tag $Tag