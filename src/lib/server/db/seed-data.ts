// Submission-policy data for the compatibility matrix.
//
// Each policy records what a venue's own instructions say about a tool.
// Community status means a maintained unofficial template exists; it does not
// imply that the venue supports or accepts it. Notes carry that caveat.
//
// Source notes for the entries below:
// - Venue pages were fetched on 2026-11-03 except where noted.
// - Science and PNAS block automated fetches. Their wording comes from archived
//   copies of the same pages (2024-03-29 and 2024-04-26) in the Wayback Machine.
// - Nature's formatting guide redirects signed-out requests to a login; its
//   wording was read from the 2026-10-15 Wayback copy.
// - ACM TAPS blocks automated fetches; its wording comes from the 2024-05-24
//   Wayback copy of https://www.acm.org/publications/taps/word-template-workflow
// - MDPI's LaTeX page blocks automated fetches; it was read from a 2024 copy.
// - Cells left without a policy mean the venue pages checked do not address
//   that tool.

export type ToolName = "Word" | "LaTeX" | "Typst";

export type PolicyStatus =
	| "official"
	| "endorsed"
	| "community"
	| "tolerated"
	| "discouraged"
	| "disallowed"
	| "unclear";

export type VenueType = "conference" | "journal" | "society" | "publisher";

export type VenueArea = "cs" | "engineering" | "science";

export type SeedPolicy = {
	tool: ToolName;
	status: PolicyStatus;
	/** Template or policy page that backs the status. */
	primaryLink?: string;
	notes?: string;
};

export type SeedVenue = {
	name: string;
	type: VenueType;
	website: string;
	language: "en" | "ja";
	area: VenueArea;
	guidelinesUrl: string;
	policies: SeedPolicy[];
};

/** Date the entries below were checked against the venue pages. */
export const LAST_CHECKED_AT = new Date("2026-11-03T00:00:00Z");

export const TOOLS: { name: ToolName; website: string }[] = [
	{ name: "Word", website: "https://www.microsoft.com/word" },
	{ name: "LaTeX", website: "https://www.latex-project.org/" },
	{ name: "Typst", website: "https://typst.app/" },
];

export const VENUES: SeedVenue[] = [
	{
		name: "NeurIPS",
		type: "conference",
		website: "https://neurips.cc/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://neurips.cc/Conferences/2026/MainTrackHandbook",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://media.neurips.cc/Conferences/NeurIPS2026/Formatting_Instructions_For_NeurIPS_2026.zip",
			},
			{
				tool: "Word",
				status: "disallowed",
				primaryLink: "https://neurips.cc/Conferences/2026/MainTrackHandbook",
				notes:
					"2026 handbook: the Word template has been discontinued; the LaTeX style file is the only template accepted.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/bloated-neurips",
				notes:
					"Unofficial port (bloated-neurips). NeurIPS accepts only its own LaTeX style file.",
			},
		],
	},
	{
		name: "ICML",
		type: "conference",
		website: "https://icml.cc/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://icml.cc/Conferences/2026/AuthorInstructions",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://media.icml.cc/Conferences/ICML2026/Styles/icml2026.zip",
			},
			{
				tool: "Word",
				status: "disallowed",
				primaryLink: "https://icml.cc/Conferences/2026/AuthorInstructions",
				notes:
					"2026 instructions: no support for any typesetting software other than LaTeX.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/lucky-icml",
				notes: "Unofficial port (lucky-icml). ICML supports LaTeX only.",
			},
		],
	},
	{
		name: "ICLR",
		type: "conference",
		website: "https://iclr.cc/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://iclr.cc/Conferences/2026/AuthorGuide",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://github.com/ICLR/Master-Template/raw/master/iclr2026.zip",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/clear-iclr",
				notes: "Unofficial port (clear-iclr).",
			},
		],
	},
	{
		name: "CVPR",
		type: "conference",
		website: "https://cvpr.thecvf.com/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://cvpr.thecvf.com/Conferences/2026/AuthorGuidelines",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://github.com/cvpr-org/author-kit/archive/refs/tags/CVPR2026-v1(latex).zip",
			},
			{
				tool: "Word",
				status: "disallowed",
				primaryLink: "https://github.com/cvpr-org/author-kit",
				notes:
					"The Microsoft Word version of the CVPR template is no longer supported.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/blind-cvpr",
				notes: "Unofficial port (blind-cvpr). CVPR requires its own template.",
			},
		],
	},
	{
		name: "IEEE",
		type: "publisher",
		website: "https://www.ieee.org/",
		language: "en",
		area: "engineering",
		guidelinesUrl:
			"https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/authoring-tools-and-templates/",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://template-selector.ieee.org/",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://template-selector.ieee.org/",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/charged-ieee",
				notes:
					"Unofficial IEEE-style template (charged-ieee). IEEE provides Word and LaTeX templates.",
			},
		],
	},
	{
		name: "ACL",
		type: "conference",
		website: "https://www.aclweb.org/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://aclrollingreview.org/cfp",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://github.com/acl-org/acl-style-files",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://acl-org.github.io/ACLPUB/formatting.html",
				notes:
					"ACLPUB documents Word style files, but acl-style-files currently contains LaTeX files only.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/tracl",
				notes: "Unofficial port (tracl).",
			},
		],
	},
	{
		name: "AAAI",
		type: "conference",
		website: "https://aaai.org/",
		language: "en",
		area: "cs",
		guidelinesUrl:
			"https://aaai.org/conference/aaai/aaai-27/submission-instructions/",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://aaai.org/authorkit27/",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://aaai.org/authorkit27/",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/triple-aaai",
				notes: "Unofficial port (triple-aaai), built from the AAAI author kit.",
			},
		],
	},
	{
		name: "IJCAI",
		type: "conference",
		website: "https://ijcai.org/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://ijcai.org/authors_kit",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://ijcai.org/sites/default/files/Guidelines/FormattingGuidelines-IJCAI-27.zip",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://ijcai.org/sites/default/files/Guidelines/FormattingGuidelines-IJCAI-27.zip",
			},
		],
	},
	{
		name: "USENIX Security",
		type: "conference",
		website: "https://www.usenix.org/conference/usenixsecurity26",
		language: "en",
		area: "cs",
		guidelinesUrl:
			"https://www.usenix.org/conferences/author-resources/paper-templates",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.usenix.org/sites/default/files/usenix2019_v3.2.tex",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.usenix.org/sites/default/files/usenix2022.doc",
				notes:
					"Sample file only; templates are optional when the paper meets the format spec.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://github.com/ja-he/usenix-compat",
				notes:
					"Unofficial compatibility template (usenix-compat); USENIX accepts any layout meeting its format spec.",
			},
		],
	},
	{
		name: "IEEE S&P",
		type: "conference",
		website: "https://sp2026.ieee-security.org/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://sp2026.ieee-security.org/cfpapers.html",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://sp2026.ieee-security.org/cfpapers.html",
			},
			{
				tool: "Word",
				status: "disallowed",
				primaryLink: "https://sp2026.ieee-security.org/cfpapers.html",
				notes:
					"The CFP requires the compsoc template and is not aware of a matching MS Word template; deviations risk rejection.",
			},
		],
	},
	{
		name: "ACM CCS",
		type: "conference",
		website: "https://www.sigsac.org/ccs/CCS2026/",
		language: "en",
		area: "cs",
		guidelinesUrl:
			"https://www.sigsac.org/ccs/CCS2026/call-for/call-for-papers.html",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.acm.org/publications/proceedings-template",
			},
			{
				tool: "Word",
				status: "disallowed",
				primaryLink:
					"https://www.sigsac.org/ccs/CCS2026/call-for/call-for-papers.html",
				notes:
					"CCS 2026 requires the unaltered ACM LaTeX template; deviations risk desk rejection.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/faithful-acmart",
				notes:
					"Unofficial acmart port (faithful-acmart, sigconf). CCS requires the ACM LaTeX template.",
			},
		],
	},
	{
		name: "PVLDB",
		type: "journal",
		website: "https://vldb.org/pvldb/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://www.vldb.org/pvldb/volumes/19/formatting",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://github.com/cwida/pvldbstyle/archive/master.zip",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://vldb.org/pvldb/wp-content/uploads/2020/PVLDBvol14Sample.docx",
			},
		],
	},
	{
		name: "CHI",
		type: "conference",
		website: "https://chi2026.acm.org/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://chi2026.acm.org/chi-publication-formats/",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://chi2026.acm.org/chi-publication-formats/",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://chi2026.acm.org/chi-publication-formats/",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/faithful-acmart",
				notes:
					"Unofficial ACM acmart port. CHI requires its own one-column template.",
			},
		],
	},
	{
		name: "SIGGRAPH",
		type: "conference",
		website: "https://s2026.siggraph.org/",
		language: "en",
		area: "cs",
		guidelinesUrl: "https://s2026.siggraph.org/program/technical-papers/",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://s2026.siggraph.org/program/technical-papers/",
			},
			{
				tool: "Word",
				status: "tolerated",
				primaryLink: "https://s2026.siggraph.org/program/technical-papers/",
				notes:
					"Word templates may need adaptation for the two-column acmtog format.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://github.com/doubleailes/template_siggraph_typst",
				notes: "Unofficial SIGGRAPH Typst template.",
			},
		],
	},
	{
		name: "IPSJ",
		type: "society",
		website: "https://www.ipsj.or.jp/",
		language: "ja",
		area: "cs",
		guidelinesUrl: "https://www.ipsj.or.jp/journal/submit/style.html",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.ipsj.or.jp/journal/submit/9faeag0000001nsz-att/wordtemp.zip",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.ipsj.or.jp/journal/submit/9faeag0000001nsz-att/ipsj_v4-1.zip",
			},
		],
	},
	{
		name: "IEICE",
		type: "society",
		website: "https://www.ieice.org/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://www.ieice.org/jpn/shiori/ess_2.html",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://www.ieice.org/jpn/shiori/template.html",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.ieice.org/ftp/tex/ieicej",
				notes: "LaTeX manuscripts have lower page charges than Word.",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://github.com/genchan-omega/ieicej_typst_template",
				notes: "Unofficial Typst template for IEICE papers.",
			},
		],
	},
	{
		name: "JSAI",
		type: "society",
		website: "https://www.ai-gakkai.or.jp/",
		language: "ja",
		area: "cs",
		guidelinesUrl:
			"https://www.ai-gakkai.or.jp/published_books/transactions_of_jsai/toukou/",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.ai-gakkai.or.jp/published_books/transactions_of_jsai/toukou/journals_download/",
			},
			{
				tool: "Word",
				status: "discouraged",
				primaryLink: "https://www.ai-gakkai.or.jp/download/jsai_word.zip",
				notes:
					"Word is offered only to authors who cannot use LaTeX; LaTeX is the default.",
			},
		],
	},
	{
		name: "JSSST",
		type: "society",
		website: "https://www.jssst.or.jp/",
		language: "ja",
		area: "cs",
		guidelinesUrl: "https://www.jssst.or.jp/edit/detail/kitei.html",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.jssst.or.jp/files/user/edit/jssst-style-20171109.zip",
			},
		],
	},
	{
		name: "JSME",
		type: "society",
		website: "https://www.jsme.or.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://www.jsme.or.jp/publish/transact/",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.jsme.or.jp/publish/Japanese-conference-template.docx",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.jsme.or.jp/publish/Japanese-conference-template.zip",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://github.com/tkrhsmt/JSME-typst",
				notes: "Unofficial Typst template (JSME-typst).",
			},
		],
	},
	{
		name: "Nature",
		type: "journal",
		website: "https://www.nature.com/",
		language: "en",
		area: "science",
		guidelinesUrl: "https://www.nature.com/nature/for-authors/formatting-guide",
		policies: [
			{
				tool: "Word",
				status: "endorsed",
				primaryLink:
					"https://www.nature.com/nature/for-authors/formatting-guide",
				notes: "Preferred text format; no Word template is provided.",
			},
			{
				tool: "LaTeX",
				status: "tolerated",
				primaryLink:
					"https://www.nature.com/nature/for-authors/formatting-guide",
				notes: "TeX/LaTeX files are converted to Word before typesetting.",
			},
		],
	},
	{
		name: "Science",
		type: "journal",
		website: "https://www.science.org/",
		language: "en",
		area: "science",
		guidelinesUrl:
			"https://www.science.org/content/page/instructions-preparing-initial-manuscript",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.science.org/content/page/instructions-preparing-initial-manuscript",
				notes: "A Word manuscript template is provided.",
			},
			{
				tool: "LaTeX",
				status: "discouraged",
				primaryLink:
					"https://www.science.org/content/page/instructions-preparing-initial-manuscript",
				notes:
					"LaTeX users are asked to convert to .docx; a LaTeX template is the fallback.",
			},
		],
	},
	{
		name: "PNAS",
		type: "journal",
		website: "https://www.pnas.org/",
		language: "en",
		area: "science",
		guidelinesUrl:
			"https://www.pnas.org/author-center/submitting-your-manuscript",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.pnas.org/author-center/submitting-your-manuscript",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.pnas.org/author-center/submitting-your-manuscript",
				notes: "The submission system runs pdfLaTeX.",
			},
		],
	},
	{
		name: "Elsevier",
		type: "publisher",
		website: "https://www.elsevier.com/",
		language: "en",
		area: "science",
		guidelinesUrl:
			"https://www.elsevier.com/researcher/author/policies-and-guidelines/latex-instructions",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.elsevier.com/researcher/author/policies-and-guidelines/latex-instructions",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/elspub",
				notes: "Unofficial Elsevier template (elspub).",
			},
		],
	},
	{
		name: "Springer Nature",
		type: "publisher",
		website: "https://www.springernature.com/",
		language: "en",
		area: "science",
		guidelinesUrl:
			"https://www.springernature.com/gp/authors/campaigns/latex-author-support",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.springernature.com/gp/authors/campaigns/latex-author-support",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink:
					"https://typst.app/universe/package/stellar-springer-nature",
				notes: "Unofficial sn-jnl port (stellar-springer-nature).",
			},
		],
	},
	{
		name: "ACM",
		type: "publisher",
		website: "https://www.acm.org/",
		language: "en",
		area: "cs",
		guidelinesUrl:
			"https://www.acm.org/publications/taps/word-template-workflow",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.acm.org/publications/proceedings-template",
			},
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.acm.org/publications/taps/word-template-workflow",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/faithful-acmart",
				notes: "Unofficial acmart port (faithful-acmart).",
			},
		],
	},
	{
		name: "PLOS",
		type: "publisher",
		website: "https://plos.org/",
		language: "en",
		area: "science",
		guidelinesUrl: "https://journals.plos.org/plosone/s/submission-guidelines",
		policies: [
			{
				tool: "Word",
				status: "tolerated",
				primaryLink:
					"https://journals.plos.org/plosone/s/submission-guidelines",
				notes: "DOC and DOCX files are accepted; no Word template is provided.",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://journals.plos.org/plosone/s/latex",
				notes: "LaTeX manuscripts must be submitted as PDFs.",
			},
		],
	},
	{
		name: "Frontiers",
		type: "publisher",
		website: "https://www.frontiersin.org/",
		language: "en",
		area: "science",
		guidelinesUrl: "https://www.frontiersin.org/guidelines/author-guidelines",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://www.frontiersin.org/guidelines/author-guidelines",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.frontiersin.org/guidelines/author-guidelines",
				notes: "LaTeX templates are provided.",
			},
		],
	},
	{
		name: "MDPI",
		type: "publisher",
		website: "https://www.mdpi.com/",
		language: "en",
		area: "science",
		guidelinesUrl: "https://www.mdpi.com/authors/latex",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.mdpi.com/authors/latex",
			},
			{
				tool: "Typst",
				status: "community",
				primaryLink: "https://typst.app/universe/package/splendid-mdpi",
				notes: "Unofficial MDPI-style template (splendid-mdpi).",
			},
		],
	},
	{
		name: "JSCE",
		type: "journal",
		website: "https://www.jsce.or.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://committees.jsce.or.jp/jjsce/notes",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://committees.jsce.or.jp/jjsce/system/files/sample_wabun_20220101_3_1.docx",
			},
			{
				tool: "LaTeX",
				status: "tolerated",
				primaryLink: "https://committees.jsce.or.jp/jjsce/notes",
				notes:
					"No LaTeX template; a generic clause accepts OS/software layout differences and asks authors to note software-forced deviations.",
			},
		],
	},
	{
		name: "AIJ",
		type: "journal",
		website: "https://www.aij.or.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl:
			"https://www.aij.or.jp/jpn/transaction/ronbun/Rinstructions.pdf",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.aij.or.jp/jpn/transaction/ronbun/template_Japanese.docx",
			},
		],
	},
	{
		name: "ASJ",
		type: "journal",
		website: "https://acoustics.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://acoustics.jp/journal/kitei_update/",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://acoustics.jp/cms/wp_asj/wp-content/uploads/WabunFrm_20260115update2.docx",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://acoustics.jp/journal/kitei/latex2e-style-file/",
				notes: "Source files are submitted with the final version only.",
			},
		],
	},
	{
		name: "RSJ",
		type: "journal",
		website: "https://www.rsj.or.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://www.rsj.or.jp/pub/jrsj/info/toukou.html",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.rsj.or.jp/content/files/pub/jrsj/stylefile/JRSJ-word/JRSJ_Template.doc",
				notes: "Word submissions have a higher page charge.",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.rsj.or.jp/pub/jrsj/info/stylefile.html",
			},
			{
				tool: "Typst",
				status: "disallowed",
				primaryLink: "https://www.rsj.or.jp/content/files/data_rules/F-02.pdf",
				notes: "Only LaTeX or plain text (including Word) is accepted.",
			},
		],
	},
	{
		name: "ANLP",
		type: "journal",
		website: "https://www.anlp.jp/",
		language: "ja",
		area: "cs",
		guidelinesUrl: "https://anlp.jp/guide/guideline-new.html",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://www.anlp.jp/guide/jnlp-template.doc",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.anlp.jp/guide/jnlp-stylefiles.zip",
			},
		],
	},
	{
		name: "JPS",
		type: "society",
		website: "https://www.jps.or.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl: "https://www.jps.or.jp/books/shippitsu_style.php",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.jps.or.jp/books/shippitsu_style.php",
				notes: "Style files for 日本物理学会誌 (the society magazine).",
			},
		],
	},
	{
		name: "JPA",
		type: "journal",
		website: "https://psych.or.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl: "https://psych.or.jp/manual/",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://psych.or.jp/wp-content/uploads/2022/10/JJP_template.docx",
			},
		],
	},
	{
		name: "MSJ",
		type: "journal",
		website: "https://www.mathsoc.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl:
			"https://www.mathsoc.jp/assets/pdf/publications/sugaku/sugaku-kitei.pdf",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.mathsoc.jp/publications/sugaku/sty/",
				notes: "Style files for the journal 数学.",
			},
			{
				tool: "Word",
				status: "tolerated",
				primaryLink:
					"https://www.mathsoc.jp/assets/pdf/publications/sugaku/sugaku-kitei.pdf",
				notes:
					"Non-TeX word processors are allowed at 44 characters by 38 lines.",
			},
		],
	},
	{
		name: "JMSJ",
		type: "journal",
		website: "https://www.mathsoc.jp/",
		language: "en",
		area: "science",
		guidelinesUrl: "https://www.mathsoc.jp/publication/JMSJ/submission.html",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.mathsoc.jp/publication/JMSJ/jmsj-classfile.zip",
			},
		],
	},
	{
		name: "JSASS",
		type: "journal",
		website: "https://www.jsass.or.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://www.jsass.or.jp/publications/127/",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://www.jsass.or.jp/wp-content/uploads/2018/10/jsample20230131.docx",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink:
					"https://www.jsass.or.jp/wp-content/uploads/2025/10/JSASS_JPN_template_2025_10_15.zip",
				notes:
					"Template is provided for reference; correct operation is not guaranteed.",
			},
		],
	},
	{
		name: "AESJ",
		type: "journal",
		website: "https://www.aesj.net/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://www.aesj.net/publish/jnst_jp/post_jp",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://www.aesj.net/permalink/jnst-jp-template/",
			},
			{
				tool: "LaTeX",
				status: "tolerated",
				primaryLink: "https://www.aesj.net/publish/jnst_jp/post_jp",
				notes: "No style file; LaTeX files are converted to PDF on submission.",
			},
		],
	},
	{
		name: "JIM",
		type: "journal",
		website: "https://jimm.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://jimm.jp/publication/journal/post.html",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://jimm.jp/publication/journal/pdf/Manuscript_Prep_20241128.docx",
			},
			{
				tool: "LaTeX",
				status: "tolerated",
				primaryLink:
					"https://jimm.jp/publication/journal/pdf/JIMM_guidepost.pdf",
				notes: "No style file; LaTeX files are listed as print files.",
			},
		],
	},
	{
		name: "JSMS",
		type: "journal",
		website: "https://www.jsms.jp/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://www.jsms.jp/kaishi/kaishi_head.htm",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://www.jsms.jp/kaishi/file/Japanese_Sample_new.docx",
			},
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://www.jsms.jp/kaishi/file/jsms-sample-2024v1-3.zip",
			},
		],
	},
	{
		name: "GSJ",
		type: "journal",
		website: "https://geosociety.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl: "https://geosociety.jp/members/postguide/",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://old2.geosociety.jp/uploads/fckeditor//publication/kiyaku/template.docx",
			},
		],
	},
	{
		name: "JORSJ",
		type: "journal",
		website: "https://orsj.org/",
		language: "en",
		area: "engineering",
		guidelinesUrl: "https://orsj.org/jorsj-torsj",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://orsj.org/jorsj-torsj",
				notes:
					"LaTeX with the society style files is required for the final manuscript.",
			},
		],
	},
	{
		name: "TORSJ",
		type: "journal",
		website: "https://orsj.org/",
		language: "ja",
		area: "engineering",
		guidelinesUrl: "https://orsj.org/jorsj-torsj",
		policies: [
			{
				tool: "LaTeX",
				status: "official",
				primaryLink: "https://orsj.org/jorsj-torsj",
				notes:
					"LaTeX with the society style files is required for the final manuscript.",
			},
		],
	},
	{
		name: "PSJ",
		type: "journal",
		website: "https://www.pharm.or.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl: "https://yakushi.pharm.or.jp/j_regulations.pdf",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://yakushi.pharm.or.jp/j_regulations.pdf",
				notes:
					"Word is required for the final manuscript text; no template is published.",
			},
		],
	},
	{
		name: "JSAC",
		type: "journal",
		website: "https://www.jsac.or.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl: "https://www.jsac.jp/~wabnsk/kitei.html",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://www.jsac.jp/~wabnsk/toko.html",
				notes: "The Word template is required for submissions.",
			},
		],
	},
	{
		name: "SSJ",
		type: "journal",
		website: "https://zisin.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl: "https://zisin.jp/org/organization_submission01.html",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink: "https://zisin.jp/org/word/hinagata2021.doc",
			},
		],
	},
	{
		name: "JOS",
		type: "journal",
		website: "https://kaiyo-gakkai.jp/",
		language: "ja",
		area: "science",
		guidelinesUrl: "https://kaiyo-gakkai.jp/jos/publications/uminokenkyu",
		policies: [
			{
				tool: "Word",
				status: "official",
				primaryLink:
					"https://kaiyo-gakkai.jp/jos/wp-content/uploads/2023/09/Kitei202309.pdf",
				notes: "Microsoft Word is prescribed; no template file is published.",
			},
		],
	},
];
