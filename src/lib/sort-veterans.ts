import type { SortConfig } from "@/types/store";
import type { ParsedFactor, ProcessedVeteran } from "@/types/veteran";

function totalStarsByColor(
	sparks: ParsedFactor[],
	color: "blue" | "pink" | "green" | "white",
): number {
	return sparks
		.filter((s) => s.color === color)
		.reduce((sum, s) => sum + s.level, 0);
}

function totalSparkCountByColor(
	sparks: ParsedFactor[],
	color: "blue" | "pink" | "green" | "white",
): number {
	return sparks.filter((s) => s.color === color).length;
}

function allSparks(v: ProcessedVeteran): ParsedFactor[] {
	return [...v.directLegacy.sparks, ...v.subLegacies.flatMap((l) => l.sparks)];
}

function getSortValue(
	v: ProcessedVeteran,
	config: SortConfig,
): number | string {
	switch (config.field) {
		case "name":
			return v.umaName;
		case "rating":
			return v.rank_score;
		case "turf":
			return v.aptitudes.turf;
		case "dirt":
			return v.aptitudes.dirt;
		case "short":
			return v.aptitudes.short;
		case "mile":
			return v.aptitudes.mile;
		case "middle":
			return v.aptitudes.middle;
		case "long":
			return v.aptitudes.long;
		case "front":
			return v.aptitudes.front;
		case "pace":
			return v.aptitudes.pace;
		case "late":
			return v.aptitudes.late;
		case "end":
			return v.aptitudes.end;
		case "speed":
			return v.speed;
		case "stamina":
			return v.stamina;
		case "power":
			return v.power;
		case "guts":
			return v.guts;
		case "wiz":
			return v.wiz;
		case "total-blue-stars":
			return totalStarsByColor(allSparks(v), "blue");
		case "total-pink-stars":
			return totalStarsByColor(allSparks(v), "pink");
		case "total-white-sparks":
			return totalSparkCountByColor(allSparks(v), "white");
		case "direct-white-sparks":
			return totalSparkCountByColor(v.directLegacy.sparks, "white");
		default:
			return 0;
	}
}

export function sortVeterans(
	veterans: ProcessedVeteran[],
	config: SortConfig,
): ProcessedVeteran[] {
	return [...veterans].sort((a, b) => {
		const aVal = getSortValue(a, config);
		const bVal = getSortValue(b, config);

		let cmp: number;
		if (typeof aVal === "string" && typeof bVal === "string") {
			cmp = aVal.localeCompare(bVal);
		} else {
			cmp = (aVal as number) - (bVal as number);
		}

		return config.direction === "asc" ? cmp : -cmp;
	});
}
