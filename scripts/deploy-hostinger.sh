#!/bin/bash

# 🚀 KASZADELLA HOSTINGER DEPLOYMENT SCRIPT
# Használat: ./scripts/deploy-hostinger.sh

echo "🚀 KASZADELLA HOSTINGER DEPLOYMENT"
echo "=================================="

# 🔍 Ellenőrzések
echo "🔍 Ellenőrzések..."

# Node.js verzió
echo "📦 Node.js verzió: $(node --version)"

# Package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json nem található!"
    exit 1
fi

# Environment template
if [ ! -f "hostinger.env.template" ]; then
    echo "❌ hostinger.env.template nem található!"
    exit 1
fi

# 🧹 Takarítás
echo "🧹 Projekt takarítása..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel

# 📦 Dependencies telepítése
echo "📦 Dependencies telepítése (build-hez szükséges)..."
npm ci

# 🏗️ Build készítése
echo "🏗️ Production build..."
NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build sikertelen!"
    exit 1
fi

# 📁 Deployment mappák létrehozása
echo "📁 Deployment fájlok előkészítése..."
mkdir -p deployment/hostinger

# 🗂️ Szükséges fájlok másolása
echo "🗂️ Fájlok másolása..."

# Alapvető fájlok
cp -r .next deployment/hostinger/
cp package.json deployment/hostinger/
cp package-lock.json deployment/hostinger/
cp next.config.ts deployment/hostinger/

# Alkalmazás kód
cp -r app deployment/hostinger/
cp -r components deployment/hostinger/
cp -r lib deployment/hostinger/
cp -r hooks deployment/hostinger/
cp -r constans deployment/hostinger/
cp auth.ts deployment/hostinger/
cp middleware.ts deployment/hostinger/
cp types.d.ts deployment/hostinger/

# Konfiguráció fájlok
cp tailwind.config.ts deployment/hostinger/
cp tsconfig.json deployment/hostinger/
cp components.json deployment/hostinger/
cp postcss.config.mjs deployment/hostinger/

# Style fájlok  
cp app/globals.css deployment/hostinger/app/

# Public fájlok
cp -r public deployment/hostinger/

# Database schema és migrations
cp -r database deployment/hostinger/
cp -r migrations deployment/hostinger/
cp drizzle.config.ts deployment/hostinger/

# Environment template
cp hostinger.env.template deployment/hostinger/

# Backup fájl
cp kaszadella_neon_backup.sql deployment/hostinger/

# 📋 Deployment útmutató másolása
cp HOSTINGER_SETUP.md deployment/hostinger/

# 🗂️ ZIP archívum készítése
echo "🗂️ ZIP archívum készítése..."
cd deployment
zip -r kaszadella-hostinger-$(date +%Y%m%d-%H%M%S).zip hostinger/

echo ""
echo "✅ DEPLOYMENT KÉSZ!"
echo "==================="
echo ""
echo "📦 ZIP fájl: deployment/kaszadella-hostinger-*.zip"
echo "📁 Mappa: deployment/hostinger/"
echo ""
echo "🎯 KÖVETKEZŐ LÉPÉSEK:"
echo "1. 📤 Töltsd fel a ZIP fájlt Hostinger cPanel File Manager-be"
echo "2. 🗄️ Állítsd be a PostgreSQL adatbázist"
echo "3. 📥 Importáld a kaszadella_neon_backup.sql fájlt"
echo "4. 🔧 Állítsd be Environment Variables-t hostinger.env.template alapján"
echo "5. 🚀 Indítsd el a Node.js alkalmazást"
echo ""
echo "📖 Részletes útmutató: HOSTINGER_SETUP.md"
echo "" 