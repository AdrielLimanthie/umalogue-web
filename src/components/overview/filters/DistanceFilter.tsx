"use client";

import { FilterPopoverShell } from "@/components/overview/FilterPopoverShell";
import { AptitudeSelect } from "@/components/overview/filters/AptitudeSelect";
import { useUIStore } from "@/stores/use-ui-store";

export function DistanceFilter() {
	const { filters, setFilter } = useUIStore();
	const active =
		filters.minShort !== null ||
		filters.minMile !== null ||
		filters.minMiddle !== null ||
		filters.minLong !== null;

	return (
		<FilterPopoverShell label="Distance" active={active}>
			<div className="flex flex-col gap-2">
				<AptitudeSelect
					id="filter-short"
					label="Sprint (min)"
					value={filters.minShort}
					onChange={(v) => setFilter("minShort", v)}
				/>
				<AptitudeSelect
					id="filter-mile"
					label="Mile (min)"
					value={filters.minMile}
					onChange={(v) => setFilter("minMile", v)}
				/>
				<AptitudeSelect
					id="filter-middle"
					label="Medium (min)"
					value={filters.minMiddle}
					onChange={(v) => setFilter("minMiddle", v)}
				/>
				<AptitudeSelect
					id="filter-long"
					label="Long (min)"
					value={filters.minLong}
					onChange={(v) => setFilter("minLong", v)}
				/>
			</div>
		</FilterPopoverShell>
	);
}
