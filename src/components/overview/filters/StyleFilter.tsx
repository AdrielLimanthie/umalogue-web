"use client";

import { FilterPopoverShell } from "@/components/overview/FilterPopoverShell";
import { AptitudeSelect } from "@/components/overview/filters/AptitudeSelect";
import { useUIStore } from "@/stores/use-ui-store";

export function StyleFilter() {
	const { filters, setFilter } = useUIStore();
	const active =
		filters.minFront !== null ||
		filters.minPace !== null ||
		filters.minLate !== null ||
		filters.minEnd !== null;

	return (
		<FilterPopoverShell label="Style" active={active}>
			<div className="flex flex-col gap-2">
				<AptitudeSelect
					id="filter-front"
					label="Front Runner"
					value={filters.minFront}
					onChange={(v) => setFilter("minFront", v)}
				/>
				<AptitudeSelect
					id="filter-pace"
					label="Pace Chaser"
					value={filters.minPace}
					onChange={(v) => setFilter("minPace", v)}
				/>
				<AptitudeSelect
					id="filter-late"
					label="Late Surger"
					value={filters.minLate}
					onChange={(v) => setFilter("minLate", v)}
				/>
				<AptitudeSelect
					id="filter-end"
					label="End Closer"
					value={filters.minEnd}
					onChange={(v) => setFilter("minEnd", v)}
				/>
			</div>
		</FilterPopoverShell>
	);
}
