import { eq } from "drizzle-orm";
import { db } from "./index";
import { policies, resources, tools, venues } from "./schema";

export const getVenues = async () => {
	return await db.select().from(venues).orderBy(venues.name);
};

export const getTools = async () => {
	return await db.select().from(tools).orderBy(tools.name);
};

export const getPoliciesForVenue = async (venueId: string) => {
	return await db
		.select({
			tool: tools,
			policy: policies,
		})
		.from(policies)
		.innerJoin(tools, eq(policies.toolId, tools.id))
		.where(eq(policies.venueId, venueId));
};

export const getVenueDetails = async (venueId: string) => {
	const venue = await db
		.select()
		.from(venues)
		.where(eq(venues.id, venueId))
		.get();
	if (!venue) return null;

	const venuePolicies = await getPoliciesForVenue(venueId);
	const venueResources = await db
		.select()
		.from(resources)
		.where(eq(resources.venueId, venueId));

	return {
		...venue,
		policies: venuePolicies.map((p) => ({
			...p.policy,
			tool: p.tool,
		})),
		resources: venueResources,
	};
};

export const getAllVenuesWithPolicies = async () => {
	const allVenues = await getVenues();
	// This might be N+1, but fine for now with small data.
	// Optimization: fetch all policies and map in memory if needed later.
	const results = await Promise.all(
		allVenues.map(async (venue) => {
			const policies = await getPoliciesForVenue(venue.id);
			return {
				...venue,
				policies: policies.map((p) => ({
					...p.policy,
					tool: p.tool,
				})),
			};
		}),
	);
	return results;
};
