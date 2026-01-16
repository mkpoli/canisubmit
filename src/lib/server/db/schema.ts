import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const venues = sqliteTable("venue", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	// 'journal', 'conference', 'society', 'publisher'
	type: text("type"),
	website: text("website"),
	language: text("language").default("en"),
	area: text("area"),
	guidelinesUrl: text("guidelines_url"),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
		() => new Date(),
	),
});

export const tools = sqliteTable("tool", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	website: text("website"),
});

export const policies = sqliteTable(
	"policy",
	{
		venueId: text("venue_id")
			.notNull()
			.references(() => venues.id),
		toolId: text("tool_id")
			.notNull()
			.references(() => tools.id),
		// 'official', 'community', 'tolerated', 'none', 'discouraged'
		status: text("status"),
		primaryLink: text("primary_link"),
		notes: text("notes"),
		lastCheckedAt: integer("last_checked_at", { mode: "timestamp" }),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.venueId, t.toolId] }),
	}),
);

export const resources = sqliteTable("resource", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	venueId: text("venue_id")
		.notNull()
		.references(() => venues.id),
	// 'guideline', 'template', 'example'
	type: text("type"),
	url: text("url").notNull(),
	isOfficial: integer("is_official", { mode: "boolean" }),
});
