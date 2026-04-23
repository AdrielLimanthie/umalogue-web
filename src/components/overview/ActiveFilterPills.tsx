"use client";

import { PillCloseButton } from "@/components/common/PillCloseButton";
import { Button } from "@/components/ui/button";
import { STAT_DEFS } from "@/constants/stats";
import { starString } from "@/lib/common";
import { factorsById, getAptitudeLabel } from "@/lib/game-data";
import type { FilterState, StatField } from "@/types/store";

type Pill = {
	key: string;
	label: string;
	onClear: () => void;
};

type Props = {
	filters: FilterState;
	setFilter: <K extends keyof FilterState>(
		key: K,
		value: FilterState[K],
	) => void;
	resetFilters: () => void;
};

const STAT_FULL_LABEL = Object.fromEntries(
	STAT_DEFS.map((def) => [def.key, def.fullLabel]),
);

const SCOPE_LABEL: Record<string, string> = {
	total: "all",
	direct: "direct",
	sub: "sub",
	any: "any",
};

export function ActiveFilterPills({ filters, setFilter, resetFilters }: Props) {
	const pills: Pill[] = [];

	if (filters.umaName) {
		pills.push({
			key: "umaName",
			label: `Uma: ${filters.umaName}`,
			onClear: () => setFilter("umaName", ""),
		});
	}

	for (const name of filters.skillNames) {
		pills.push({
			key: `skill:${name}`,
			label: `Skill: ${name}`,
			onClear: () =>
				setFilter(
					"skillNames",
					filters.skillNames.filter((s) => s !== name),
				),
		});
	}

	const aptitudeFilters: [keyof FilterState, string][] = [
		["minTurf", "Turf"],
		["minDirt", "Dirt"],
		["minShort", "Sprint"],
		["minMile", "Mile"],
		["minMiddle", "Medium"],
		["minLong", "Long"],
		["minFront", "Front"],
		["minPace", "Pace"],
		["minLate", "Late"],
		["minEnd", "End"],
	];

	for (const [key, name] of aptitudeFilters) {
		const val = filters[key] as number | null;
		if (val !== null) {
			pills.push({
				key: key as string,
				label: `${name} ≥ ${getAptitudeLabel(val)}`,
				onClear: () => setFilter(key, null as FilterState[typeof key]),
			});
		}
	}

	for (const [field, min] of Object.entries(filters.statFilters) as [
		StatField,
		number,
	][]) {
		pills.push({
			key: `stat:${field}`,
			label: `${STAT_FULL_LABEL[field] ?? field} ≥ ${min}`,
			onClear: () => {
				const next = { ...filters.statFilters };
				delete next[field];
				setFilter("statFilters", next);
			},
		});
	}

	for (const [i, f] of filters.blueSparks.entries()) {
		pills.push({
			key: `blueSpark:${i}`,
			label: sparkPillLabel("Blue spark:", f.factorId, f.minStars, f.scope),
			onClear: () =>
				setFilter(
					"blueSparks",
					filters.blueSparks.filter((_, j) => j !== i),
				),
		});
	}

	for (const [i, f] of filters.pinkSparks.entries()) {
		pills.push({
			key: `pinkSpark:${i}`,
			label: sparkPillLabel("Pink spark:", f.factorId, f.minStars, f.scope),
			onClear: () =>
				setFilter(
					"pinkSparks",
					filters.pinkSparks.filter((_, j) => j !== i),
				),
		});
	}

	for (const [i, f] of filters.greenSparks.entries()) {
		pills.push({
			key: `greenSpark:${i}`,
			label: sparkPillLabel("Green spark:", f.factorId, f.minStars, f.scope),
			onClear: () =>
				setFilter(
					"greenSparks",
					filters.greenSparks.filter((_, j) => j !== i),
				),
		});
	}

	for (const [i, f] of filters.whiteSparks.entries()) {
		pills.push({
			key: `whiteSpark:${i}`,
			label: sparkPillLabel("White spark:", f.factorId, f.minStars, f.scope),
			onClear: () =>
				setFilter(
					"whiteSparks",
					filters.whiteSparks.filter((_, j) => j !== i),
				),
		});
	}

	if (filters.minWhiteSparks) {
		const { value, scope } = filters.minWhiteSparks;
		const scopeLabel = scope === "direct" ? "direct" : "any";
		pills.push({
			key: "minWhiteSparks",
			label: `White sparks (${scopeLabel}) ≥ ${value}`,
			onClear: () => setFilter("minWhiteSparks", null),
		});
	}

	for (const tag of filters.tags) {
		pills.push({
			key: `tag:${tag}`,
			label: `Tag: ${tag}`,
			onClear: () =>
				setFilter(
					"tags",
					filters.tags.filter((t) => t !== tag),
				),
		});
	}

	if (pills.length === 0) return null;

	return (
		<>
			<div className="text-sm text-muted-foreground whitespace-nowrap">
				Active Filters
			</div>
			<div className="flex flex-wrap items-center gap-1.5">
				{pills.map((pill) => (
					<span
						key={pill.key}
						className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium"
					>
						{pill.label}
						<PillCloseButton
							onClick={pill.onClear}
							ariaLabel={`Remove filter: ${pill.label}`}
						/>
					</span>
				))}
				{pills.length >= 2 && (
					<Button
						variant="ghost"
						size="sm"
						onClick={resetFilters}
						className="hover:text-destructive"
					>
						Clear all
					</Button>
				)}
			</div>
		</>
	);
}

function sparkPillLabel(
	prefix: string,
	factorId: string | null,
	minStars: number,
	scope: string,
): string {
	const factorName = factorId
		? (factorsById.get(factorId)?.name_en ?? factorId)
		: "Any";
	return `${prefix} ${factorName} ${starString(minStars)} (${SCOPE_LABEL[scope] ?? scope})`;
}
