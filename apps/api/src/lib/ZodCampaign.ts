import { z } from 'zod';

export const DifficultySchema = z.enum([
	'effortless',
	'natural',
	'easy',
	'tricky',
	'tough',
	'ambitious',
	'despairing',
	'insane',
	'infernal',
]);

export type DifficultyType = `${z.infer<typeof DifficultySchema>}`;

export const CampaignSchema = z.object({
	id: z.string(),
	name: z.string(),
	players: z.string().array(),
	avgLevel: z.number().int().nullable(),
	minLevel: z.number().int().nullable(),
	maxLevel: z.number().int().nullable(),
	charNb: z.number().int().nullable(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
	nextSession: z.coerce.date().nullable(),
	dm: z.string(),
	creator: z.string(),
	active: z.boolean().nullable(),
});

export type Campaign = z.infer<typeof CampaignSchema>;

export const NewCampaignSchema = z.object({
	name: z.string(),
	dm: z.string(),
	creator: z.string(),
});

export type NewCampaign = z.infer<typeof NewCampaignSchema>;
