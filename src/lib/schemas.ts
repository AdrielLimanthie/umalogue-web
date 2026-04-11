import { z } from "zod";

const SkillEntrySchema = z.object({
	skill_id: z.number(),
	level: z.number(),
});

const LegacySchema = z.object({
	position_id: z.number().optional(),
	card_id: z.number(),
	rank: z.number().optional(),
	rarity: z.number(),
	talent_level: z.number().optional(),
	factor_id_array: z.array(z.number()),
});

export const RawVeteranSchema = z.object({
	trained_chara_id: z.number(),
	owner_trained_chara_id: z.number(),
	card_id: z.number(),
	speed: z.number(),
	stamina: z.number(),
	power: z.number(),
	wiz: z.number(),
	guts: z.number(),
	fans: z.number(),
	rank_score: z.number(),
	rank: z.number(),
	scenario_id: z.number(),
	proper_ground_turf: z.number(),
	proper_ground_dirt: z.number(),
	proper_running_style_nige: z.number(),
	proper_running_style_senko: z.number(),
	proper_running_style_sashi: z.number(),
	proper_running_style_oikomi: z.number(),
	proper_distance_short: z.number(),
	proper_distance_mile: z.number(),
	proper_distance_middle: z.number(),
	proper_distance_long: z.number(),
	rarity: z.number(),
	talent_level: z.number(),
	wins: z.number(),
	race_result_list: z.array(z.unknown()),
	skill_array: z.array(SkillEntrySchema),
	factor_id_array: z.array(z.number()),
	succession_chara_array: z.array(LegacySchema).min(2),
});

export type RawVeteran = z.infer<typeof RawVeteranSchema>;

export const VeteranUploadSchema = z.union([
	RawVeteranSchema.transform((v) => [v]),
	z.array(RawVeteranSchema),
]);
