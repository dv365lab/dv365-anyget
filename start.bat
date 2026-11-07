@echo off
setlocal EnableExtensions DisableDelayedExpansion
title OmniGet - Development Launcher

rem Always run from the project directory, even when opened via a shortcut.
pushd "%~dp0"
if errorlevel 1 goto directory_error

echo [OmniGet] Checking development tools...
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js was not found. Install Node.js LTS and reopen this file.
    goto failed
)
where pnpm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] pnpm was not found. Install pnpm 10.29.3 and reopen this file.
    echo         You can install it with: npm install -g pnpm@10.29.3
    goto failed
)
where cargo >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Rust was not found. Install Rust using rustup and reopen this file.
    echo         Also install Visual Studio Build Tools with Desktop development with C++.
    goto failed
)

echo.
echo [OmniGet] Installing or updating project dependencies...
call pnpm install --frozen-lockfile
if errorlevel 1 goto failed

echo.
echo [OmniGet] Starting the desktop app. The first Rust build may take a while.
echo [OmniGet] Keep this window open while using development mode.
call pnpm tauri dev
if errorlevel 1 goto failed

popd
endlocal
exit /b 0

:failed
echo.
echo [ERROR] OmniGet could not start. Check the error messages above.
echo         Windows builds require C++ Build Tools, Windows SDK and WebView2 Runtime.
popd
pause
endlocal
exit /b 1

:directory_error
echo [ERROR] Could not open the project directory.
pause
endlocal
exit /b 1
