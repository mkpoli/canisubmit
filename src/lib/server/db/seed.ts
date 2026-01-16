import { eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type * as schema from "./schema";
import { policies, tools, venues } from "./schema";

export async function seed(db: LibSQLDatabase<typeof schema>) {
	console.log("Seeding...");

	// Tools
	const toolList = [
		{ name: "Word", website: "https://www.microsoft.com/word" },
		{ name: "LaTeX", website: "https://www.latex-project.org/" },
		{ name: "Typst", website: "https://typst.app/" },
	];

	const insertedTools = [];
	for (const t of toolList) {
		let [existing] = await db
			.select()
			.from(tools)
			.where(eq(tools.name, t.name));
		if (!existing) {
			[existing] = await db.insert(tools).values(t).returning();
		}
		insertedTools.push(existing);
	}

	// Venues
	const venueList = [
		{
			name: "IEEE Conferences",
			type: "conference",
			website: "https://www.ieee.org/conferences/",
			language: "en",
			area: "engineering",
			guidelinesUrl:
				"https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/",
		},
		{
			name: "ACM Proceedings",
			type: "conference",
			website: "https://www.acm.org/publications/proceedings",
			language: "en",
			area: "cs",
			guidelinesUrl:
				"https://www.acm.org/publications/taps/word-template-workflow",
		},
		{
			name: "Nature",
			type: "journal",
			website: "https://www.nature.com/",
			language: "en",
			area: "science",
			guidelinesUrl:
				"https://www.nature.com/nature/for-authors/formatting-guide",
		},
		{
			name: "NeurIPS",
			type: "conference",
			website: "https://neurips.cc/",
			language: "en",
			area: "cs",
			guidelinesUrl:
				"https://neurips.cc/Conferences/2023/PaperInformation/StyleFiles",
		},
		{
			name: "Information Processing Society of Japan (IPSJ)",
			type: "society",
			website: "https://www.ipsj.or.jp/",
			language: "ja",
			area: "cs",
			guidelinesUrl: "https://www.ipsj.or.jp/english/jip/submit/style.html",
		},
		{
			name: "The Institute of Electronics, Information and Communication Engineers (IEICE)",
			type: "society",
			website: "https://www.ieice.org/",
			language: "ja",
			area: "engineering",
			guidelinesUrl: "https://www.ieice.org/eng/shiori/mokuji_iss.html",
		},
	];

	const insertedVenues = [];
	for (const v of venueList) {
		let [existing] = await db
			.select()
			.from(venues)
			.where(eq(venues.name, v.name));
		if (!existing) {
			[existing] = await db.insert(venues).values(v).returning();
		}
		insertedVenues.push(existing);
	}

	// Policies (Sample)
	// IEEE - LaTeX (Official), Word (Official), Typst (Community)
	const ieee = insertedVenues.find((v) => v.name === "IEEE Conferences")!;
	const latex = insertedTools.find((t) => t.name === "LaTeX")!;
	const word = insertedTools.find((t) => t.name === "Word")!;
	const typst = insertedTools.find((t) => t.name === "Typst")!;

	await db
		.insert(policies)
		.values([
			{
				venueId: ieee.id,
				toolId: latex.id,
				status: "official",
				primaryLink:
					"https://www.ieee.org/conferences/publishing/templates.html",
			},
			{
				venueId: ieee.id,
				toolId: word.id,
				status: "official",
				primaryLink:
					"https://www.ieee.org/conferences/publishing/templates.html",
			},
			{
				venueId: ieee.id,
				toolId: typst.id,
				status: "community",
				primaryLink: "https://github.com/mitex-rs/mitex",
				notes: "Unofficial templates exist in Typst Universe.",
			},
		])
		.onConflictDoNothing();

	console.log("Seeding complete.");
}
