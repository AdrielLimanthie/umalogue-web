"use client";

import { FilterPopoverShell } from "@/components/overview/FilterPopoverShell";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/stores/use-ui-store";
import type { StatField } from "@/types/store";

const STAT_OPTIONS: { value: StatField; label: string }[] = [
	{ value: "speed", label: "Speed" },
	{ value: "stamina", label: "Stamina" },
	{ value: "power", label: "Power" },
	{ value: "guts", label: "Guts" },
	{ value: "wiz", label: "Wit" },
];

export function StatsFilter() {
	const { filters, setFilter } = useUIStore();
	const active = Object.keys(filters.statFilters).length > 0;

	function setStatFilter(field: StatField, raw: string) {
		const next = { ...filters.statFilters };
		if (raw === "") {
			delete next[field];
		} else {
			next[field] = Number(raw);
		}
		setFilter("statFilters", next);
	}

	return (
		<FilterPopoverShell label="Stats" active={active}>
			<div className="flex flex-col gap-2">
				{STAT_OPTIONS.map(({ value, label }) => (
					<div key={value} className="flex items-center gap-2">
						<label
							htmlFor={`filter-stat-${value}`}
							className="w-16 text-xs text-muted-foreground shrink-0"
						>
							{label}
						</label>
						<Input
							id={`filter-stat-${value}`}
							type="number"
							min={0}
							max={2500}
							value={filters.statFilters[value] ?? ""}
							onChange={(e) => setStatFilter(value, e.target.value)}
							placeholder="min"
							className="h-7 text-sm"
						/>
					</div>
				))}
			</div>
		</FilterPopoverShell>
	);
}
