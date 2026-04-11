"use client";

import { FilterCombobox } from "@/components/overview/FilterCombobox";
import { gameData, getUmaDisplayName } from "@/lib/game-data";
import { useUIStore } from "@/stores/use-ui-store";

const OPTIONS = gameData.umas.map((u) => ({
	value: getUmaDisplayName(u.card_id),
	label: getUmaDisplayName(u.card_id),
	sublabel: u.title_en_gl,
}));

export function UmaNameFilter() {
	const { filters, setFilter } = useUIStore();

	return (
		<FilterCombobox
			options={OPTIONS}
			value={filters.umaName}
			onChange={(v) => setFilter("umaName", v)}
			triggerLabel="Uma"
			placeholder="Search by name or title…"
		/>
	);
}
