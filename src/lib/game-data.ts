import type {
	Aptitude,
	Factor,
	FactorGain,
	GameData,
	Rank,
	Scenario,
	Skill,
	Uma,
} from "@/types/game";
import rawData from "../../data/game-data.json";

const gameData = rawData as GameData;

export const umasByCardId = new Map<number, Uma>(
	gameData.umas.map((u) => [u.card_id, u]),
);

export const skillsById = new Map<number, Skill>(
	gameData.skills.map((s) => [s.id, s]),
);

export const factorsById = new Map<string, Factor>(
	gameData.factors.map((f) => [f.id, f]),
);

export const scenariosById = new Map<number, Scenario>(
	gameData.scenarios.map((s) => [s.scenario_id, s]),
);

export const aptitudesByValue = new Map<number, Aptitude>(
	gameData.aptitudes.map((a) => [a.aptitude, a]),
);

export const ranksByValue = new Map<number, Rank>(
	gameData.ranks.map((r) => [r.rank, r]),
);

export const blueFactors = gameData.factors.filter((f) => f.color === "blue");
export const pinkFactors = gameData.factors.filter((f) => f.color === "pink");
export const greenFactors = gameData.factors.filter((f) => f.color === "green");
export const whiteFactors = gameData.factors.filter((f) => f.color === "white");

export const getAptitudeLabel = (value: number): string =>
	aptitudesByValue.get(value)?.aptitude_label ?? String(value);

export const getRankLabel = (value: number): string =>
	ranksByValue.get(value)?.rank_label ?? String(value);

export const getUmaDisplayName = (cardId: number): string => {
	const uma = umasByCardId.get(cardId);
	if (!uma) return `Unknown Uma (${cardId})`;
	return uma.version ? `${uma.name_en} (${uma.version})` : uma.name_en;
};

export const getFactorGains = (factorId: string): null | FactorGain[] => {
	const foundFactor = gameData.factors.find((factor) => factor.id === factorId);
	if (!foundFactor || !foundFactor.gains) {
		return null;
	}
	return foundFactor.gains;
};

export { gameData };
