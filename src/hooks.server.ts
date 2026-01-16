import type { Handle } from "@sveltejs/kit";
import { migrate } from "drizzle-orm/libsql/migrator";
import { dev } from "$app/environment";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { db } from "$lib/server/db";
import { seed } from "$lib/server/db/seed";

// Run migrations and seed in development using a lazy singleton pattern
let dbInitialized = false;
let initPromise: Promise<void> | null = null;

async function initDb() {
	if (dbInitialized) return;
	try {
		console.log("Initializing local development database...");
		await migrate(db, { migrationsFolder: "drizzle" });
		await seed(db);
		console.log("Local database initialized.");
		dbInitialized = true;
	} catch (e) {
		console.error("Failed to initialize local database:", e);
	}
}

const handleParaglide: Handle = async ({ event, resolve }) => {
	if (dev) {
		if (!initPromise) initPromise = initDb();
		await initPromise;
	}

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace("%paraglide.lang%", locale),
		});
	});
};

export const handle: Handle = handleParaglide;
