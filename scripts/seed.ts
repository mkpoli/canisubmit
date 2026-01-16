import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/lib/server/db/schema";
import { seed } from "../src/lib/server/db/seed";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
if (!process.env.DATABASE_AUTH_TOKEN)
	throw new Error("DATABASE_AUTH_TOKEN is not set");

const client = createClient({
	url: process.env.DATABASE_URL,
	authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

seed(db).catch(console.error);
