"use client";

import { FilterCombobox } from "@/components/overview/FilterCombobox";
import { gameData } from "@/lib/game-data";
import { useUIStore } from "@/stores/use-ui-store";

const OPTIONS = Array.from(new Set(gameData.skills.map((s) => s.name_en))).map(
	(name) => ({ value: name, label: name }),
);

export function SkillsFilter() {
	const { filters, setFilter } = useUIStore();

	return (
		<FilterCombobox
			multiple
			options={OPTIONS}
			value={filters.skillNames}
			onChange={(v) => setFilter("skillNames", v)}
			triggerLabel="Skills"
			placeholder="Search skill name…"
		/>
	);
}
