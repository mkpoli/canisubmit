import {
	getAllVenuesWithPolicies,
	getTools,
} from "$lib/server/db/repositories";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const venues = await getAllVenuesWithPolicies();
	const tools = await getTools();
	return {
		venues,
		tools,
	};
};
