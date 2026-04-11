"use client";

import { FilterPopoverShell } from "@/components/overview/FilterPopoverShell";
import { AptitudeSelect } from "@/components/overview/filters/AptitudeSelect";
import { useUIStore } from "@/stores/use-ui-store";

export function TrackFilter() {
	const { filters, setFilter } = useUIStore();
	const active = filters.minTurf !== null || filters.minDirt !== null;

	return (
		<FilterPopoverShell label="Track" active={active}>
			<div className="flex flex-col gap-2">
				<AptitudeSelect
					id="filter-turf"
					label="Turf (min)"
					value={filters.minTurf}
					onChange={(v) => setFilter("minTurf", v)}
				/>
				<AptitudeSelect
					id="filter-dirt"
					label="Dirt (min)"
					value={filters.minDirt}
					onChange={(v) => setFilter("minDirt", v)}
				/>
			</div>
		</FilterPopoverShell>
	);
}
