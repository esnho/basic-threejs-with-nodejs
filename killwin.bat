@echo off
for /F "usebackq delims=" %%A in (`netstat -ano ^| grep 8080 ^| awk '{print $5}'`) do taskkill /F /PID %%A
