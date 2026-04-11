"use client";

import { X } from "lucide-react";
import { FilterCombobox } from "@/components/overview/FilterCombobox";
import { FilterPopoverShell } from "@/components/overview/FilterPopoverShell";
import { Button } from "@/components/ui/button";
import { FILTER_SELECT_CLASS } from "@/constants/styles";
import {
	blueFactors,
	greenFactors,
	pinkFactors,
	whiteFactors,
} from "@/lib/game-data";
import type {
	GreenWhiteSparkFilter,
	SparkFilter as SparkFilterType,
} from "@/types/store";

type BluePinkProps = {
	color: "blue" | "pink";
	label: string;
	filters: SparkFilterType[];
	onFiltersChange: (f: SparkFilterType[]) => void;
};

type GreenWhiteProps = {
	color: "green" | "white";
	label: string;
	filters: GreenWhiteSparkFilter[];
	onFiltersChange: (f: GreenWhiteSparkFilter[]) => void;
};

type Props = BluePinkProps | GreenWhiteProps;

const FACTORS_BY_COLOR = {
	blue: blueFactors,
	pink: pinkFactors,
	green: greenFactors,
	white: whiteFactors,
};

const FACTOR_TRIGGER_CLASS =
	"w-full h-7 justify-between gap-1 rounded-md border border-input bg-background px-2 text-xs font-normal";

function uid() {
	return Math.random().toString(36).slice(2);
}

function toOptions(factors: Array<{ id: string; name_en: string }>) {
	return [
		{ value: "", label: "Any" },
		...factors.map((f) => ({ value: f.id, label: f.name_en })),
	];
}

export function SparkFilter({ color, label, filters, onFiltersChange }: Props) {
	const isGreenOrWhite = color === "green" || color === "white";
	const factors = FACTORS_BY_COLOR[color];
	const options = toOptions(factors);
	const active = filters.length > 0;

	const totalScopeStars = !isGreenOrWhite
		? (filters as SparkFilterType[])
				.filter((f) => f.scope === "total")
				.reduce((sum, f) => sum + f.minStars, 0)
		: 0;
	const addDisabled = !isGreenOrWhite && totalScopeStars >= 9;

	function addFilter() {
		if (isGreenOrWhite) {
			const next: GreenWhiteSparkFilter = {
				uid: uid(),
				factorId: null,
				minStars: 1,
				scope: "any",
			};
			(onFiltersChange as (f: GreenWhiteSparkFilter[]) => void)([
				...(filters as GreenWhiteSparkFilter[]),
				next,
			]);
		} else {
			const next: SparkFilterType = {
				uid: uid(),
				factorId: null,
				minStars: 1,
				scope: "total",
			};
			(onFiltersChange as (f: SparkFilterType[]) => void)([
				...(filters as SparkFilterType[]),
				next,
			]);
		}
	}

	function removeFilter(index: number) {
		// biome-ignore lint/suspicious/noExplicitAny: union array types
		onFiltersChange((filters as any[]).filter((_, i) => i !== index) as any);
	}

	function updateFilter(
		index: number,
		patch: Partial<SparkFilterType & GreenWhiteSparkFilter>,
	) {
		// biome-ignore lint/suspicious/noExplicitAny: union array types
		const next = (filters as any[]).map((f, i) =>
			i === index ? { ...f, ...patch } : f,
		);
		// biome-ignore lint/suspicious/noExplicitAny: union array types
		onFiltersChange(next as any);
	}

	function getEffectiveMaxStars(index: number): number {
		if (isGreenOrWhite) return 3;
		const entry = (filters as SparkFilterType[])[index];
		if (entry.scope !== "total") return 3;
		const otherTotal = (filters as SparkFilterType[])
			.filter((f, i) => i !== index && f.scope === "total")
			.reduce((sum, f) => sum + f.minStars, 0);
		return Math.max(1, 9 - otherTotal);
	}

	return (
		<FilterPopoverShell
			label={label}
			active={active}
			align="start"
			contentClassName="w-[460px]"
		>
			<div className="flex flex-col gap-3 min-w-0">
				{filters.length === 0 ? (
					<p className="text-xs text-muted-foreground text-center py-2">
						No filters yet.
					</p>
				) : (
					<div className="flex flex-col gap-1.5">
						{/* Column headers */}
						<div className="grid grid-cols-[1fr_60px_84px_24px] gap-1 px-0.5">
							<span className="text-xs text-muted-foreground">Type</span>
							<span className="text-xs text-muted-foreground">Min</span>
							<span className="text-xs text-muted-foreground">Scope</span>
							<span />
						</div>

						{filters.map((f, i) => {
							const entry = f as SparkFilterType & GreenWhiteSparkFilter;
							const maxStars = getEffectiveMaxStars(i);
							const starOptions = Array.from(
								{ length: maxStars },
								(_, k) => k + 1,
							);
							const currentScope =
								entry.scope ?? (isGreenOrWhite ? "any" : "total");

							return (
								<div
									key={f.uid}
									className="grid grid-cols-[1fr_60px_84px_24px] gap-1 items-center"
								>
									<FilterCombobox
										options={options}
										value={f.factorId ?? ""}
										onChange={(v) => updateFilter(i, { factorId: v || null })}
										triggerLabel="Any"
										placeholder="Search…"
										hideActiveIndicator
										triggerClassName={FACTOR_TRIGGER_CLASS}
									/>

									<select
										value={f.minStars}
										onChange={(e) =>
											updateFilter(i, { minStars: Number(e.target.value) })
										}
										className={FILTER_SELECT_CLASS}
									>
										{starOptions.map((n) => (
											<option key={n} value={n}>
												{n}
											</option>
										))}
									</select>

									<select
										value={currentScope}
										onChange={(e) => {
											const scope = e.target.value;
											// biome-ignore lint/suspicious/noExplicitAny: union scope types
											const patch: any = { scope };
											if (
												!isGreenOrWhite &&
												scope !== "total" &&
												entry.minStars > 3
											) {
												patch.minStars = 3;
											}
											updateFilter(i, patch);
										}}
										className={FILTER_SELECT_CLASS}
									>
										{isGreenOrWhite ? (
											<>
												<option value="any">Any</option>
												<option value="direct">Direct</option>
											</>
										) : (
											<>
												<option value="total">All</option>
												<option value="direct">Direct</option>
												<option value="sub">Sub</option>
											</>
										)}
									</select>

									<button
										type="button"
										onClick={() => removeFilter(i)}
										className="flex items-center justify-center text-muted-foreground cursor-pointer hover:text-destructive"
										aria-label="Remove filter"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							);
						})}
					</div>
				)}

				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={addFilter}
					disabled={addDisabled}
					className="self-start"
				>
					+ Add filter
				</Button>
			</div>
		</FilterPopoverShell>
	);
}
