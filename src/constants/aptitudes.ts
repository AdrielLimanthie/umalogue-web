import type { AptitudeSet } from "@/types/veteran";

export const APTITUDE_COLOR: Record<string, string> = {
	S: "bg-apt-s text-apt-foreground",
	A: "bg-apt-a text-apt-foreground",
	B: "bg-apt-b text-apt-foreground",
	C: "bg-apt-c text-apt-foreground",
	D: "bg-apt-d text-apt-foreground",
	E: "bg-apt-e text-apt-foreground",
	F: "bg-apt-f text-apt-foreground",
	G: "bg-apt-g text-apt-foreground",
};

export type AptitudeSectionRow = {
	key: string;
	shortKey: string;
	aptitudeKey: keyof AptitudeSet;
};

export type AptitudeSection = {
	label: string;
	rows: AptitudeSectionRow[];
};

export const APTITUDE_ROWS: {
	label: string;
	valueKey: keyof AptitudeSet;
	labelKey: keyof AptitudeSet;
}[] = [
	{ label: "Turf", valueKey: "turf", labelKey: "turfLabel" },
	{ label: "Dirt", valueKey: "dirt", labelKey: "dirtLabel" },
	{ label: "Sprint", valueKey: "short", labelKey: "shortLabel" },
	{ label: "Mile", valueKey: "mile", labelKey: "mileLabel" },
	{ label: "Medium", valueKey: "middle", labelKey: "middleLabel" },
	{ label: "Long", valueKey: "long", labelKey: "longLabel" },
	{ label: "Front Runner", valueKey: "front", labelKey: "frontLabel" },
	{ label: "Pace Chaser", valueKey: "pace", labelKey: "paceLabel" },
	{ label: "Late Surger", valueKey: "late", labelKey: "lateLabel" },
	{ label: "End Closer", valueKey: "end", labelKey: "endLabel" },
];

export const APTITUDE_SECTIONS: AptitudeSection[] = [
	{
		label: "Track",
		rows: [
			{ key: "Turf", shortKey: "Turf", aptitudeKey: "turfLabel" },
			{ key: "Dirt", shortKey: "Dirt", aptitudeKey: "dirtLabel" },
		],
	},
	{
		label: "Distance",
		rows: [
			{ key: "Sprint", shortKey: "Sprint", aptitudeKey: "shortLabel" },
			{ key: "Mile", shortKey: "Mile", aptitudeKey: "mileLabel" },
			{ key: "Medium", shortKey: "Medium", aptitudeKey: "middleLabel" },
			{ key: "Long", shortKey: "Long", aptitudeKey: "longLabel" },
		],
	},
	{
		label: "Style",
		rows: [
			{ key: "Front Runner", shortKey: "Front", aptitudeKey: "frontLabel" },
			{ key: "Pace Chaser", shortKey: "Pace", aptitudeKey: "paceLabel" },
			{ key: "Late Surger", shortKey: "Late", aptitudeKey: "lateLabel" },
			{ key: "End Closer", shortKey: "End", aptitudeKey: "endLabel" },
		],
	},
];
