import {
	factorsById,
	getAptitudeLabel,
	getRankLabel,
	getUmaDisplayName,
	scenariosById,
	skillsById,
	umasByCardId,
} from "@/lib/game-data";
import type { RawVeteran } from "@/lib/schemas";
import type {
	ParsedFactor,
	ProcessedLegacy,
	ProcessedSkill,
	ProcessedVeteran,
} from "@/types/veteran";

/**
 * Parses a raw factor number into its components.
 * Rule: last 2 digits = level, remaining digits = factor_id
 * e.g. 10040201 -> factor_id="100402", level=1
 */
function parseFactor(raw: number): ParsedFactor | null {
	const s = String(raw);
	if (s.length < 3) return null;

	const level = parseInt(s.slice(-2), 10);
	const factor_id = s.slice(0, -2);

	const factor = factorsById.get(factor_id);
	if (!factor) return null;

	return {
		factor_id,
		level,
		name_en: factor.name_en,
		color: factor.color,
		type: factor.type,
	};
}

function parseLegacySparks(factorIds: number[]): ParsedFactor[] {
	return factorIds.flatMap((raw) => {
		const parsed = parseFactor(raw);
		return parsed ? [parsed] : [];
	});
}

function processLegacy(
	cardId: number,
	rarity: number,
	factorIds: number[],
	isDirectLegacy: boolean,
): ProcessedLegacy {
	return {
		card_id: cardId,
		rarity,
		umaName: getUmaDisplayName(cardId),
		isDirectLegacy,
		sparks: parseLegacySparks(factorIds),
	};
}

function processSkills(
	skillArray: { skill_id: number; level: number }[],
): ProcessedSkill[] {
	return skillArray.flatMap(({ skill_id, level }) => {
		const skill = skillsById.get(skill_id);
		if (!skill) return [];
		return [
			{
				skill_id,
				level,
				name_en: skill.name_en,
				iconid: skill.iconid,
				rarity: skill.rarity,
			},
		];
	});
}

export function processVeteran(raw: RawVeteran): ProcessedVeteran | null {
	if (raw.owner_trained_chara_id !== 0) {
		return null;
	}

	const id = String(raw.trained_chara_id);

	const directLegacy = processLegacy(
		raw.card_id,
		raw.rarity,
		raw.factor_id_array,
		true,
	);

	const sub0 = raw.succession_chara_array[0];
	const sub1 = raw.succession_chara_array[1];

	const subLegacies: [ProcessedLegacy, ProcessedLegacy] = [
		processLegacy(sub0.card_id, sub0.rarity, sub0.factor_id_array, false),
		processLegacy(sub1.card_id, sub1.rarity, sub1.factor_id_array, false),
	];

	const scenarioName =
		scenariosById.get(raw.scenario_id)?.name ?? `Scenario ${raw.scenario_id}`;
	const rankLabel = getRankLabel(raw.rank);

	return {
		id,
		card_id: raw.card_id,
		umaName: getUmaDisplayName(raw.card_id),
		umaTitle: umasByCardId.get(raw.card_id)?.title_en_gl ?? "",
		speed: raw.speed,
		stamina: raw.stamina,
		power: raw.power,
		guts: raw.guts,
		wiz: raw.wiz,
		fans: raw.fans,
		rank_score: raw.rank_score,
		rank: raw.rank,
		rarity: raw.rarity,
		talent_level: raw.talent_level,
		wins: raw.wins,
		race_count: raw.race_result_list.length,
		scenario_id: raw.scenario_id,
		rankLabel,
		scenarioName,
		aptitudes: {
			turf: raw.proper_ground_turf,
			turfLabel: getAptitudeLabel(raw.proper_ground_turf),
			dirt: raw.proper_ground_dirt,
			dirtLabel: getAptitudeLabel(raw.proper_ground_dirt),
			front: raw.proper_running_style_nige,
			frontLabel: getAptitudeLabel(raw.proper_running_style_nige),
			pace: raw.proper_running_style_senko,
			paceLabel: getAptitudeLabel(raw.proper_running_style_senko),
			late: raw.proper_running_style_sashi,
			lateLabel: getAptitudeLabel(raw.proper_running_style_sashi),
			end: raw.proper_running_style_oikomi,
			endLabel: getAptitudeLabel(raw.proper_running_style_oikomi),
			short: raw.proper_distance_short,
			shortLabel: getAptitudeLabel(raw.proper_distance_short),
			mile: raw.proper_distance_mile,
			mileLabel: getAptitudeLabel(raw.proper_distance_mile),
			middle: raw.proper_distance_middle,
			middleLabel: getAptitudeLabel(raw.proper_distance_middle),
			long: raw.proper_distance_long,
			longLabel: getAptitudeLabel(raw.proper_distance_long),
		},
		skills: processSkills(raw.skill_array),
		directLegacy,
		subLegacies,
	};
}
