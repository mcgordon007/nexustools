# SEO Cleanup Script for NexusTools
# This script removes redundant svelte:head blocks from tool pages
# since ToolLayout now handles SEO

$toolsPath = "src\routes\tools"

# Get all tool pages (excluding category pages)
$files = Get-ChildItem -Path $toolsPath -Recurse -Filter "+page.svelte" | 
  Where-Object { $_.DirectoryName -notmatch "(developer|text|security|image)$" }

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  
  # Check if file uses ToolLayout
  if ($content -match "ToolLayout") {
    # Remove svelte:head block
    $newContent = $content -replace '(?s)<svelte:head>.*?</svelte:head>\s*', ''
    
    if ($content -ne $newContent) {
      Set-Content -Path $file.FullName -Value $newContent -NoNewline
      Write-Host "Cleaned: $($file.Name)"
    }
  }
}

Write-Host "`nDone! Category pages (developer, text, security, image) were left unchanged."
