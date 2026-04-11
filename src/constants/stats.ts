export type StatKey = "speed" | "stamina" | "power" | "guts" | "wiz";

export type StatDef = {
	key: StatKey;
	label: string;
	fullLabel: string;
	colorClass: string;
};

export const STAT_DEFS: StatDef[] = [
	{
		key: "speed",
		label: "SPD",
		fullLabel: "Speed",
		colorClass: "bg-stat-speed",
	},
	{
		key: "stamina",
		label: "STA",
		fullLabel: "Stamina",
		colorClass: "bg-stat-stamina",
	},
	{
		key: "power",
		label: "PWR",
		fullLabel: "Power",
		colorClass: "bg-stat-power",
	},
	{ key: "guts", label: "GUT", fullLabel: "Guts", colorClass: "bg-stat-guts" },
	{ key: "wiz", label: "WIT", fullLabel: "Wit", colorClass: "bg-stat-wit" },
];

export const MAX_STAT_CARD = 1200;
export const MAX_STAT_DETAIL = 2500;
