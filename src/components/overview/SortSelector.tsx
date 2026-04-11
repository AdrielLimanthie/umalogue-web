"use client";

import { FILTER_SELECT_CLASS } from "@/constants/styles";
import { useUIStore } from "@/stores/use-ui-store";
import type { SortConfig, SortField } from "@/types/store";

const SORT_OPTIONS: { value: SortField; label: string }[] = [
	{ value: "rating", label: "Rating" },
	{ value: "name", label: "Uma name" },
	{ value: "turf", label: "Turf aptitude" },
	{ value: "dirt", label: "Dirt aptitude" },
	{ value: "short", label: "Sprint aptitude" },
	{ value: "mile", label: "Mile aptitude" },
	{ value: "middle", label: "Medium aptitude" },
	{ value: "long", label: "Long aptitude" },
	{ value: "front", label: "Front Runner aptitude" },
	{ value: "pace", label: "Pace Chaser aptitude" },
	{ value: "late", label: "Late Surger aptitude" },
	{ value: "end", label: "End Closer aptitude" },
	{ value: "speed", label: "Speed" },
	{ value: "stamina", label: "Stamina" },
	{ value: "power", label: "Power" },
	{ value: "guts", label: "Guts" },
	{ value: "wiz", label: "Wit" },
	{ value: "total-blue-stars", label: "Total Blue Sparks (★)" },
	{ value: "total-pink-stars", label: "Total Pink Sparks (★)" },
	{ value: "total-white-sparks", label: "Total White Sparks (count)" },
];

export function SortSelector() {
	const { sort, setSort } = useUIStore();

	const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSort({ ...sort, field: e.target.value as SortField });
	};

	const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSort({ ...sort, direction: e.target.value as SortConfig["direction"] });
	};

	return (
		<>
			<label
				htmlFor="sort-field"
				className="block text-sm text-muted-foreground whitespace-nowrap"
			>
				Sort by
			</label>
			<div className="flex items-center gap-2 shrink-0">
				<select
					id="sort-field"
					value={sort.field}
					onChange={handleFieldChange}
					className={`${FILTER_SELECT_CLASS} h-8 w-auto`}
				>
					{SORT_OPTIONS.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
				<select
					id="sort-dir"
					aria-label="Sort direction"
					value={sort.direction}
					onChange={handleDirectionChange}
					className={`${FILTER_SELECT_CLASS} h-8 w-auto`}
				>
					<option value="desc">↓ Desc</option>
					<option value="asc">↑ Asc</option>
				</select>
			</div>
		</>
	);
}
