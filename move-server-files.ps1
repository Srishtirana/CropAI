# Move server files to the new location
Move-Item -Path "src/server/config/*" -Destination "server/src/config/" -Force
Move-Item -Path "src/server/controllers/*" -Destination "server/src/controllers/" -Force
Move-Item -Path "src/server/middleware/*" -Destination "server/src/middleware/" -Force
Move-Item -Path "src/server/models/*" -Destination "server/src/models/" -Force
Move-Item -Path "src/server/routes/*" -Destination "server/src/routes/" -Force
Move-Item -Path "src/server/server.js" -Destination "server/src/" -Force
Move-Item -Path "src/server/utils/*" -Destination "server/src/utils/" -Force

# Remove the old server directory
Remove-Item -Recurse -Force "src/server"

Write-Host "Server files have been moved to the new location."
