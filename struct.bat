@echo off
echo Creating Smart E-Commerce folder structure...

:: App routes
mkdir src\app\login
mkdir src\app\dashboard

:: Components
mkdir src\components

:: Lib & utils
mkdir src\lib

:: Styles
mkdir src\styles

:: Create files
type nul > src\app\login\page.tsx
type nul > src\app\dashboard\page.tsx
type nul > src\app\dashboard\layout.tsx

type nul > src\components\Navbar.tsx
type nul > src\components\Sidebar.tsx

type nul > src\lib\utils.ts
type nul > src\styles\globals.css

echo Folder structure created successfully!
pause
