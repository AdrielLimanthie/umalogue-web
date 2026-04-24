export type Uma = {
	card_id: number;
	name_en: string;
	title_en_gl: string;
	version?: string;
};

export type Skill = {
	id: number;
	name_en: string;
	iconid: number;
	rarity: number;
};

export type Factor = {
	id: string;
	type: number;
	name_en: string;
	color: "blue" | "pink" | "green" | "white";
	gains?: FactorGain[];
};

export type FactorGain = {
	level: 0 | 1 | 2 | 3;
	gain: string;
};

export type Scenario = {
	scenario_id: number;
	name: string;
};

export type Rank = {
	rank: number;
	rank_label: string;
};

export type Aptitude = {
	aptitude: number;
	aptitude_label: string;
};

export type SkillRarity = {
	id: number;
	skill_type: string;
};

export type FactorType = {
	id: number;
	type: string;
};

export type FactorColor = {
	color_name: string;
	color_value: string;
};

export type GameData = {
	umas: Uma[];
	skills: Skill[];
	factors: Factor[];
	scenarios: Scenario[];
	ranks: Rank[];
	aptitudes: Aptitude[];
	skill_rarities: SkillRarity[];
	factor_types: FactorType[];
	factor_colors: FactorColor[];
};
