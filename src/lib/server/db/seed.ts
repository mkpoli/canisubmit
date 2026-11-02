import { eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type * as schema from "./schema";
import { policies, tools, venues } from "./schema";
import { LAST_CHECKED_AT, TOOLS, VENUES } from "./seed-data";

type Database = LibSQLDatabase<typeof schema>;

export async function seed(db: Database) {
	console.log("Seeding...");

	const toolIds = new Map<string, string>();

	for (const tool of TOOLS) {
		const [existing] = await db
			.select()
			.from(tools)
			.where(eq(tools.name, tool.name));

		if (existing) {
			toolIds.set(tool.name, existing.id);
			continue;
		}

		const [inserted] = await db
			.insert(tools)
			.values(tool)
			.returning({ id: tools.id });
		toolIds.set(tool.name, inserted.id);
	}

	for (const venue of VENUES) {
		const [existing] = await db
			.select()
			.from(venues)
			.where(eq(venues.name, venue.name));

		let venueId: string;

		if (existing) {
			venueId = existing.id;
		} else {
			const [inserted] = await db
				.insert(venues)
				.values({
					name: venue.name,
					type: venue.type,
					website: venue.website,
					language: venue.language,
					area: venue.area,
					guidelinesUrl: venue.guidelinesUrl,
					updatedAt: LAST_CHECKED_AT,
				})
				.returning({ id: venues.id });
			venueId = inserted.id;
		}

		for (const policy of venue.policies) {
			const toolId = toolIds.get(policy.tool);
			if (!toolId) throw new Error(`Unknown tool: ${policy.tool}`);

			await db
				.insert(policies)
				.values({
					venueId,
					toolId,
					status: policy.status,
					primaryLink: policy.primaryLink ?? null,
					notes: policy.notes ?? null,
					lastCheckedAt: LAST_CHECKED_AT,
				})
				.onConflictDoNothing();
		}
	}

	console.log(`Seeding complete: ${VENUES.length} venues.`);
}
