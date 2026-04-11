"use client";

import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FilterState, SortConfig } from "@/types/store";
import { DEFAULT_FILTERS, DEFAULT_SORT } from "@/types/store";

type UIStoreState = {
	isDarkMode: boolean;
	filters: FilterState;
	sort: SortConfig;
	isCompareMode: boolean;
};

type UIStoreActions = {
	toggleDarkMode: () => void;
	setFilter: <K extends keyof FilterState>(
		key: K,
		value: FilterState[K],
	) => void;
	resetFilters: () => void;
	setSort: (sort: SortConfig) => void;
	setCompareMode: (v: boolean) => void;
};

type UIStore = UIStoreState & UIStoreActions;

export const useUIStore = create<UIStore>()(
	persist(
		(set) => ({
			isDarkMode: false,
			filters: DEFAULT_FILTERS,
			sort: DEFAULT_SORT,
			isCompareMode: false,

			toggleDarkMode: () =>
				set(
					produce<UIStoreState>((state) => {
						state.isDarkMode = !state.isDarkMode;
					}),
				),

			setFilter: (key, value) =>
				set(
					produce<UIStoreState>((state) => {
						(state.filters as FilterState)[key] = value;
					}),
				),

			resetFilters: () =>
				set(
					produce<UIStoreState>((state) => {
						state.filters = DEFAULT_FILTERS;
					}),
				),

			setSort: (sort) =>
				set(
					produce<UIStoreState>((state) => {
						state.sort = sort;
					}),
				),

			setCompareMode: (v) =>
				set(
					produce<UIStoreState>((state) => {
						state.isCompareMode = v;
					}),
				),
		}),
		{
			name: "umalogue-ui",
			// isCompareMode is session-only — exclude from persistence
			partialize: (state) => ({
				isDarkMode: state.isDarkMode,
				filters: state.filters,
				sort: state.sort,
			}),
		},
	),
);
