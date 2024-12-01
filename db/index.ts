import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
  var db: PostgresJsDatabase | undefined;
}

let db: PostgresJsDatabase;

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DB_URL!));
} else {
  if (!global.db) global.db = drizzle(postgres(process.env.DB_URL!));

  db = global.db;
}

export { db };
