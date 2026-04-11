import type {
	FilterState,
	GreenWhiteSparkFilter,
	SparkFilter,
	StatField,
} from "@/types/store";
import type { ParsedFactor, ProcessedVeteran } from "@/types/veteran";

function totalStars(sparks: ParsedFactor[]): number {
	return sparks.reduce((sum, s) => sum + s.level, 0);
}

function matchesBluePinkFilter(
	veteran: ProcessedVeteran,
	filter: SparkFilter,
	color: "blue" | "pink",
): boolean {
	const { factorId, minStars, scope } = filter;

	const matchesFactor = (s: ParsedFactor) =>
		s.color === color && (factorId === null || s.factor_id === factorId);

	if (scope === "direct") {
		const sparks = veteran.directLegacy.sparks.filter(matchesFactor);
		return totalStars(sparks) >= minStars;
	}

	if (scope === "sub") {
		const sparks = veteran.subLegacies.flatMap((l) =>
			l.sparks.filter(matchesFactor),
		);
		return totalStars(sparks) >= minStars;
	}

	// total: all 3 legacies combined
	const allSparks = [
		...veteran.directLegacy.sparks,
		...veteran.subLegacies.flatMap((l) => l.sparks),
	].filter(matchesFactor);
	return totalStars(allSparks) >= minStars;
}

function matchesGreenWhiteFilter(
	veteran: ProcessedVeteran,
	filter: GreenWhiteSparkFilter,
	color: "green" | "white",
): boolean {
	const { factorId, minStars, scope } = filter;

	const matchesFactor = (s: ParsedFactor) =>
		s.color === color && (factorId === null || s.factor_id === factorId);

	const legacies =
		scope === "direct"
			? [veteran.directLegacy]
			: [veteran.directLegacy, ...veteran.subLegacies];

	return legacies.some((l) => {
		const sparks = l.sparks.filter(matchesFactor);
		return sparks.some((s) => s.level >= minStars);
	});
}

export function filterVeterans(
	veterans: ProcessedVeteran[],
	filters: FilterState,
	tags: Record<string, string[]>,
): ProcessedVeteran[] {
	return veterans.filter((v) => {
		// Uma name filter
		if (
			filters.umaName &&
			!v.umaName.toLowerCase().includes(filters.umaName.toLowerCase())
		) {
			return false;
		}

		// Aptitude filters
		if (filters.minTurf !== null && v.aptitudes.turf < filters.minTurf)
			return false;
		if (filters.minDirt !== null && v.aptitudes.dirt < filters.minDirt)
			return false;
		if (filters.minShort !== null && v.aptitudes.short < filters.minShort)
			return false;
		if (filters.minMile !== null && v.aptitudes.mile < filters.minMile)
			return false;
		if (filters.minMiddle !== null && v.aptitudes.middle < filters.minMiddle)
			return false;
		if (filters.minLong !== null && v.aptitudes.long < filters.minLong)
			return false;
		if (filters.minFront !== null && v.aptitudes.front < filters.minFront)
			return false;
		if (filters.minPace !== null && v.aptitudes.pace < filters.minPace)
			return false;
		if (filters.minLate !== null && v.aptitudes.late < filters.minLate)
			return false;
		if (filters.minEnd !== null && v.aptitudes.end < filters.minEnd)
			return false;

		// Stats filter — AND across all active stat fields
		for (const [field, min] of Object.entries(filters.statFilters)) {
			if (v[field as StatField] < (min as number)) return false;
		}

		// Skills filter — AND across all selected skills
		for (const name of filters.skillNames) {
			const query = name.toLowerCase();
			if (!v.skills.some((s) => s.name_en.toLowerCase().includes(query)))
				return false;
		}

		// Spark filters — AND across all entries per color
		for (const f of filters.blueSparks) {
			if (!matchesBluePinkFilter(v, f, "blue")) return false;
		}
		for (const f of filters.pinkSparks) {
			if (!matchesBluePinkFilter(v, f, "pink")) return false;
		}
		for (const f of filters.greenSparks) {
			if (!matchesGreenWhiteFilter(v, f, "green")) return false;
		}
		for (const f of filters.whiteSparks) {
			if (!matchesGreenWhiteFilter(v, f, "white")) return false;
		}

		// Tags filter
		if (filters.tags.length > 0) {
			const veteranTags = tags[v.id] ?? [];
			const hasAllTags = filters.tags.every((tag) => veteranTags.includes(tag));
			if (!hasAllTags) return false;
		}

		return true;
	});
}
