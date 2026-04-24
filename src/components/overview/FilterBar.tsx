"use client";

import { ActiveFilterPills } from "@/components/overview/ActiveFilterPills";
import { DistanceFilter } from "@/components/overview/filters/DistanceFilter";
import { SkillsFilter } from "@/components/overview/filters/SkillsFilter";
import { SparkFilter } from "@/components/overview/filters/SparkFilter";
import { StatsFilter } from "@/components/overview/filters/StatsFilter";
import { StyleFilter } from "@/components/overview/filters/StyleFilter";
import { TagFilter } from "@/components/overview/filters/TagFilter";
import { TrackFilter } from "@/components/overview/filters/TrackFilter";
import { UmaNameFilter } from "@/components/overview/filters/UmaNameFilter";
import { WhiteSparkCountFilter } from "@/components/overview/filters/WhiteSparkCountFilter";
import { SortSelector } from "@/components/overview/SortSelector";
import { useUIStore } from "@/stores/use-ui-store";

export function FilterBar() {
	const { filters, setFilter, resetFilters } = useUIStore();

	return (
		<div className="flex flex-col gap-2 bg-card border border-border rounded-lg p-3">
			<div className="text-sm text-muted-foreground whitespace-nowrap">
				Filter
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<UmaNameFilter />
				<TrackFilter />
				<DistanceFilter />
				<StyleFilter />
				<StatsFilter />
				<SkillsFilter />
				<SparkFilter
					color="blue"
					label="Blue ✦"
					filters={filters.blueSparks}
					onFiltersChange={(f) => setFilter("blueSparks", f)}
				/>
				<SparkFilter
					color="pink"
					label="Pink ✦"
					filters={filters.pinkSparks}
					onFiltersChange={(f) => setFilter("pinkSparks", f)}
				/>
				<SparkFilter
					color="green"
					label="Green ✦"
					filters={filters.greenSparks}
					onFiltersChange={(f) => setFilter("greenSparks", f)}
				/>
				<SparkFilter
					color="white"
					label="White ✦"
					filters={filters.whiteSparks}
					onFiltersChange={(f) => setFilter("whiteSparks", f)}
				/>
				<WhiteSparkCountFilter />
				<TagFilter />
			</div>

			<SortSelector />

			<ActiveFilterPills
				filters={filters}
				setFilter={setFilter}
				resetFilters={resetFilters}
			/>
		</div>
	);
}
