@echo off

:: Start the server in a new command window
start cmd /k "cd server && npm run dev"

:: Navigate to the client directory and start the client
cd client
ng s -o

pause
