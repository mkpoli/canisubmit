import { error, redirect } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { policies, tools, venues } from "$lib/server/db/schema";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const venueId = url.searchParams.get("venueId");
	const toolId = url.searchParams.get("toolId");

	if (!venueId || !toolId) {
		throw error(400, "Missing venueId or toolId");
	}

	const venue = await db.query.venues.findFirst({
		where: eq(venues.id, venueId),
	});

	const tool = await db.query.tools.findFirst({
		where: eq(tools.id, toolId),
	});

	if (!venue || !tool) {
		throw error(404, "Venue or Tool not found");
	}

	const policy = await db.query.policies.findFirst({
		where: and(eq(policies.venueId, venueId), eq(policies.toolId, toolId)),
	});

	return {
		venue,
		tool,
		policy,
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const venueId = data.get("venueId");
		const toolId = data.get("toolId");
		const status = data.get("status");
		const primaryLink = data.get("primaryLink");
		const notes = data.get("notes");

		if (!venueId || !toolId) {
			return { success: false, error: "Missing IDs" };
		}

		// Check if exists
		const existing = await db.query.policies.findFirst({
			where: and(
				eq(policies.venueId, venueId as string),
				eq(policies.toolId, toolId as string),
			),
		});

		if (existing) {
			await db
				.update(policies)
				.set({
					status: status as string,
					primaryLink: primaryLink as string,
					notes: notes as string,
					lastCheckedAt: new Date(),
				})
				.where(
					and(
						eq(policies.venueId, venueId as string),
						eq(policies.toolId, toolId as string),
					),
				);
		} else {
			await db.insert(policies).values({
				venueId: venueId as string,
				toolId: toolId as string,
				status: status as string,
				primaryLink: primaryLink as string,
				notes: notes as string,
				lastCheckedAt: new Date(),
			});
		}

		throw redirect(303, "/");
	},
};
