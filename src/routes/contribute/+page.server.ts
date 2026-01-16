import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import * as m from "$lib/paraglide/messages";
import { db } from "$lib/server/db";
import { venues } from "$lib/server/db/schema";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get("id");
	let venue = null;

	if (id) {
		const result = await db.select().from(venues).where(eq(venues.id, id));
		if (result.length > 0) {
			venue = result[0];
		}
	}

	return {
		venue,
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get("id")?.toString();
		const name = data.get("name")?.toString();
		const type = data.get("type")?.toString();
		const website = data.get("website")?.toString();
		const language = data.get("language")?.toString();
		const area = data.get("area")?.toString();
		const guidelinesUrl = data.get("guidelinesUrl")?.toString();

		if (!name) {
			return { success: false, error: m.error_name_required() };
		}

		const venueData: typeof venues.$inferInsert = {
			name,
			type: type || null,
			website: website || null,
			language: language || "en",
			area: area || null,
			guidelinesUrl: guidelinesUrl || null,
			updatedAt: new Date(),
		};

		if (id) {
			await db.update(venues).set(venueData).where(eq(venues.id, id));
		} else {
			await db.insert(venues).values({
				...venueData,
				id: crypto.randomUUID(),
			});
		}

		throw redirect(303, "/");
	},
};
