import type { ParsedFactor } from "@/types/veteran";
import { getFactorGains } from "./game-data";

export function starString(n: number) {
	if (n > 3) {
		return `${n}★`;
	}
	return "★".repeat(n);
}

export const getSparkDescription = (
	spark: ParsedFactor,
	isDirect?: boolean,
) => {
	const gains = getFactorGains(spark.factor_id);
	if (!gains) {
		const stars = starString(spark.level);
		return `${spark.name_en} ${stars}${isDirect ? " (direct)" : ""}`;
	}

	const levelDependentGain = gains.find((gain) => gain.level === spark.level);
	if (levelDependentGain) {
		return `${levelDependentGain.gain}${isDirect ? " (direct)" : ""}`;
	}

	const nonLevelDependentGain = gains.find((gain) => gain.level === 0);
	if (nonLevelDependentGain) {
		return `${nonLevelDependentGain.gain}${isDirect ? " (direct)" : ""}`;
	}

	return "N/A";
};
