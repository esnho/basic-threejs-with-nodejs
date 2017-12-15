@echo off
cls
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do     rem"') do (
  set "DEL=%%a"
)
call :colorEcho a0 "TRYING TO STOP RUNNING SERVERS"
echo.
for /F "usebackq delims=" %%A in (`netstat -ano ^| grep 8080 ^| awk '{print $5}'`) do taskkill /F /PID %%A
ECHO ------------
call :colorEcho a0 "RUN THE SERVER"
echo.
npm run dev
exit
:colorEcho
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1i
