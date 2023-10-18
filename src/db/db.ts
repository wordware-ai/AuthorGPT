import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw Error(`DATABASE_URL was not defined: ${databaseUrl}`);
}

const sql = neon(databaseUrl, { fetchOptions: { cache: "no-cache" } });
export const db = drizzle(sql, { schema });
