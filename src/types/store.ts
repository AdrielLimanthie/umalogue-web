export type SparkFilterScope = "total" | "direct" | "sub";
export type GreenWhiteSparkFilterScope = "direct" | "any";
export type StatField = "speed" | "stamina" | "power" | "guts" | "wiz";

export type SparkFilter = {
	uid: string; // stable React key; set on creation
	factorId: string | null; // null = any type of this color
	minStars: number; // 1, 2, or 3
	scope: SparkFilterScope;
};

export type GreenWhiteSparkFilter = {
	uid: string; // stable React key; set on creation
	factorId: string | null;
	minStars: number;
	scope: GreenWhiteSparkFilterScope;
};

export type FilterState = {
	umaName: string;
	// Track aptitudes — null means no filter
	minTurf: number | null;
	minDirt: number | null;
	// Distance aptitudes
	minShort: number | null;
	minMile: number | null;
	minMiddle: number | null;
	minLong: number | null;
	// Style aptitudes
	minFront: number | null;
	minPace: number | null;
	minLate: number | null;
	minEnd: number | null;
	// Stats — per-field min values; absent key = no filter for that field
	statFilters: Partial<Record<StatField, number>>;
	// Skills — AND across all entries
	skillNames: string[];
	// Sparks — AND across all entries per color
	blueSparks: SparkFilter[];
	pinkSparks: SparkFilter[];
	greenSparks: GreenWhiteSparkFilter[];
	whiteSparks: GreenWhiteSparkFilter[];
	// Tags
	tags: string[];
};

export type SortField =
	| "name"
	| "rating"
	| "turf"
	| "dirt"
	| "short"
	| "mile"
	| "middle"
	| "long"
	| "front"
	| "pace"
	| "late"
	| "end"
	| "speed"
	| "stamina"
	| "power"
	| "guts"
	| "wiz"
	| "total-blue-stars"
	| "total-pink-stars"
	| "total-white-sparks";

export type SortConfig = {
	field: SortField;
	direction: "asc" | "desc";
};

export const DEFAULT_FILTERS: FilterState = {
	umaName: "",
	minTurf: null,
	minDirt: null,
	minShort: null,
	minMile: null,
	minMiddle: null,
	minLong: null,
	minFront: null,
	minPace: null,
	minLate: null,
	minEnd: null,
	statFilters: {},
	skillNames: [],
	blueSparks: [],
	pinkSparks: [],
	greenSparks: [],
	whiteSparks: [],
	tags: [],
};

export const DEFAULT_SORT: SortConfig = {
	field: "rating",
	direction: "desc",
};
