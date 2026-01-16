CREATE TABLE `policy` (
	`venue_id` text NOT NULL,
	`tool_id` text NOT NULL,
	`status` text,
	`primary_link` text,
	`notes` text,
	`last_checked_at` integer,
	PRIMARY KEY(`venue_id`, `tool_id`),
	FOREIGN KEY (`venue_id`) REFERENCES `venue`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tool_id`) REFERENCES `tool`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `resource` (
	`id` text PRIMARY KEY NOT NULL,
	`venue_id` text NOT NULL,
	`type` text,
	`url` text NOT NULL,
	`is_official` integer,
	FOREIGN KEY (`venue_id`) REFERENCES `venue`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tool` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`website` text
);
--> statement-breakpoint
CREATE TABLE `venue` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text,
	`website` text,
	`language` text DEFAULT 'en',
	`area` text,
	`guidelines_url` text,
	`updated_at` integer
);
