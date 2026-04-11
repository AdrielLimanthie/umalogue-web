export type ParsedFactor = {
	factor_id: string;
	level: number;
	name_en: string;
	color: "blue" | "pink" | "green" | "white";
	type: number;
};

export type ProcessedSkill = {
	skill_id: number;
	level: number;
	name_en: string;
	iconid: number;
	rarity: number;
};

export type AptitudeSet = {
	turf: number;
	turfLabel: string;
	dirt: number;
	dirtLabel: string;
	front: number;
	frontLabel: string;
	pace: number;
	paceLabel: string;
	late: number;
	lateLabel: string;
	end: number;
	endLabel: string;
	short: number;
	shortLabel: string;
	mile: number;
	mileLabel: string;
	middle: number;
	middleLabel: string;
	long: number;
	longLabel: string;
};

export type ProcessedLegacy = {
	card_id: number;
	rarity: number;
	umaName: string;
	isDirectLegacy: boolean;
	sparks: ParsedFactor[];
};

export type ProcessedVeteran = {
	id: string; // String(trained_chara_id)
	card_id: number;
	umaName: string; // name_en (+ " (version)" if version exists)
	umaTitle: string; // title_en_gl
	speed: number;
	stamina: number;
	power: number;
	guts: number;
	wiz: number;
	fans: number;
	rank_score: number;
	rank: number;
	rarity: number;
	talent_level: number;
	wins: number;
	race_count: number;
	scenario_id: number;
	rankLabel: string;
	scenarioName: string;
	aptitudes: AptitudeSet;
	skills: ProcessedSkill[];
	directLegacy: ProcessedLegacy;
	subLegacies: [ProcessedLegacy, ProcessedLegacy];
};
