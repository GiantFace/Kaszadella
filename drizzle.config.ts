import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// 🔍 Környezet felismerése
const isDevelopment = process.env.NODE_ENV === "development" || !process.env.VERCEL;
const isProduction = process.env.NODE_ENV === "production";
const isHostinger = process.env.DATABASE_URL?.includes("kaszadella_prod");

// 📁 Megfelelő env fájl betöltése
if (isDevelopment) {
  config({ path: ".env.local" }); 
} else {
  config({ path: ".env.local" }); // Fallback
}

// 🗄️ Adatbázis URL prioritás
const developmentDbUrl = "postgresql://kaszadella_user:kaszadella_pass123@localhost:5432/kaszadella_dev";
const databaseUrl = process.env.DATABASE_URL || (isDevelopment ? developmentDbUrl : undefined);

// 📊 Debug info
console.log("🌍 Környezet:", {
  isDevelopment,
  isProduction, 
  isHostinger,
  hasDbUrl: !!process.env.DATABASE_URL,
  dbHost: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]
});

if (!databaseUrl) {
  throw new Error(`
🚨 DATABASE_URL hiányzik!

🔧 Fejlesztési környezethez:
   1. Indítsd el: npm run db:local
   2. Vagy állítsd be Neon URL-t .env.local-ban

🏠 Hostinger környezethez:
   1. Állítsd be cPanel Environment Variables-ben
   2. postgresql://kaszadella_user:[PASSWORD]@localhost:5432/kaszadella_prod
  `);
}

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./migrations", 
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
    // 🏠 Hostinger specifikus beállítások
    ssl: isHostinger ? "prefer" : undefined,
  },
  // 🔄 Migration beállítások
  verbose: isDevelopment,
  strict: true,
});
