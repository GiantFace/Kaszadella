import config from "@/lib/config";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";

// 🔍 Adatbázis típus felismerése
const databaseUrl = config.env.databaseURL;
const isNeonDatabase = databaseUrl.includes("neon.tech");
const isHostingerDatabase = databaseUrl.includes("kaszadella_prod") || databaseUrl.includes("localhost");

let db: any;

if (isNeonDatabase) {
  // 🌟 NEON Database (Serverless)
  console.log("🔍 Adatbázis: Neon PostgreSQL (Serverless)");
  const sql = neon(databaseUrl);
  db = drizzle({ client: sql });
  
} else if (isHostingerDatabase) {
  // 🏠 HOSTINGER Database (Standard PostgreSQL)
  console.log("🔍 Adatbázis: Hostinger PostgreSQL (Standard)");
  const client = postgres(databaseUrl, {
    ssl: databaseUrl.includes("localhost") ? false : "require",
    max: 10, // Kapcsolat pool
    idle_timeout: 20,
    connect_timeout: 10
  });
  db = drizzlePg(client);
  
} else {
  // 🔧 FEJLESZTŐI Database (Lokális)
  console.log("🔍 Adatbázis: Fejlesztői PostgreSQL (Lokális)");
  const client = postgres(databaseUrl, {
    ssl: false,
    max: 5
  });
  db = drizzlePg(client);
}

console.log("📊 Database Info:", {
  isNeonDatabase,
  isHostingerDatabase,
  host: databaseUrl.split('@')[1]?.split('/')[0] || 'unknown'
});

export { db };
