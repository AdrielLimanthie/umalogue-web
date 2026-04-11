"use client";

import { useShallow } from "zustand/react/shallow";
import { FilterCombobox } from "@/components/overview/FilterCombobox";
import { useUIStore } from "@/stores/use-ui-store";
import { selectAllTags, useVeteranStore } from "@/stores/use-veteran-store";

export function TagFilter() {
	const { filters, setFilter } = useUIStore();
	const allTags = useVeteranStore(useShallow(selectAllTags));

	const options = allTags.map((t) => ({ value: t, label: t }));

	return (
		<FilterCombobox
			multiple
			options={options}
			value={filters.tags}
			onChange={(v) => setFilter("tags", v)}
			triggerLabel="Tags"
			placeholder="Search tag…"
		/>
	);
}
