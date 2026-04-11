"use client";

import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { processVeteran } from "@/lib/process-veteran";
import type { RawVeteran } from "@/lib/schemas";
import type { ProcessedVeteran } from "@/types/veteran";

type VeteranStoreState = {
	veterans: ProcessedVeteran[];
	tags: Record<string, string[]>; // id -> tag array
	compareSelection: string[]; // max 2 IDs
};

type VeteranStoreActions = {
	upsertVeterans: (incoming: RawVeteran[]) => void;
	addTag: (veteranId: string, tag: string) => void;
	removeTag: (veteranId: string, tag: string) => void;
	toggleCompare: (veteranId: string) => void;
	clearCompare: () => void;
};

type VeteranStore = VeteranStoreState & VeteranStoreActions;

export const useVeteranStore = create<VeteranStore>()(
	persist(
		(set) => ({
			veterans: [],
			tags: {},
			compareSelection: [],

			upsertVeterans: (incoming) =>
				set(
					produce<VeteranStoreState>((state) => {
						const processed = incoming
							.map(processVeteran)
							.filter(Boolean) as ProcessedVeteran[];
						const incomingIds = new Set(processed.map((v) => v.id));

						// Remove veterans not present in the new upload
						state.veterans = state.veterans.filter((v) =>
							incomingIds.has(v.id),
						);

						// Clean up tags for removed veterans
						for (const id of Object.keys(state.tags)) {
							if (!incomingIds.has(id)) {
								delete state.tags[id];
							}
						}

						// Upsert: add new, overwrite existing (preserving tags separately)
						const existingIds = new Set(state.veterans.map((v) => v.id));
						for (const veteran of processed) {
							if (existingIds.has(veteran.id)) {
								const idx = state.veterans.findIndex(
									(v) => v.id === veteran.id,
								);
								state.veterans[idx] = veteran;
							} else {
								state.veterans.push(veteran);
							}
						}
					}),
				),

			addTag: (veteranId, tag) =>
				set(
					produce<VeteranStoreState>((state) => {
						if (!state.tags[veteranId]) state.tags[veteranId] = [];
						if (!state.tags[veteranId].includes(tag)) {
							state.tags[veteranId].push(tag);
						}
					}),
				),

			removeTag: (veteranId, tag) =>
				set(
					produce<VeteranStoreState>((state) => {
						if (!state.tags[veteranId]) return;
						state.tags[veteranId] = state.tags[veteranId].filter(
							(t) => t !== tag,
						);
					}),
				),

			toggleCompare: (veteranId) =>
				set(
					produce<VeteranStoreState>((state) => {
						const idx = state.compareSelection.indexOf(veteranId);
						if (idx !== -1) {
							state.compareSelection.splice(idx, 1);
						} else if (state.compareSelection.length < 2) {
							state.compareSelection.push(veteranId);
						}
					}),
				),

			clearCompare: () =>
				set(
					produce<VeteranStoreState>((state) => {
						state.compareSelection = [];
					}),
				),
		}),
		{
			name: "umalogue-veterans",
		},
	),
);

/** Derived selector: all unique tags across all veterans */
export const selectAllTags = (state: VeteranStore): string[] => {
	const tagSet = new Set<string>();
	for (const tags of Object.values(state.tags)) {
		for (const tag of tags) tagSet.add(tag);
	}
	return Array.from(tagSet).sort();
};
