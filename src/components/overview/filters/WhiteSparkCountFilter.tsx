"use client";

import { FilterPopoverShell } from "@/components/overview/FilterPopoverShell";
import { Input } from "@/components/ui/input";
import { FILTER_SELECT_CLASS } from "@/constants/styles";
import { useUIStore } from "@/stores/use-ui-store";
import type { GreenWhiteSparkFilterScope } from "@/types/store";

export function WhiteSparkCountFilter() {
	const { filters, setFilter } = useUIStore();
	const current = filters.minWhiteSparks;
	const active = !!current;
	const scope = current?.scope ?? "any";

	const handleScopeChange = (newScope: GreenWhiteSparkFilterScope) => {
		if (!current) return;
		setFilter("minWhiteSparks", { value: current.value, scope: newScope });
	};

	const handleValueChange = (raw: string) => {
		if (!raw) {
			setFilter("minWhiteSparks", null);
		} else {
			setFilter("minWhiteSparks", { value: Number(raw), scope });
		}
	};

	return (
		<FilterPopoverShell label="Min White ✦" active={active}>
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-[56px_1fr] gap-x-2 gap-y-1.5 items-center">
					<span className="text-xs text-muted-foreground">Scope</span>
					<select
						value={scope}
						onChange={(e) =>
							handleScopeChange(e.target.value as GreenWhiteSparkFilterScope)
						}
						className={FILTER_SELECT_CLASS}
					>
						<option value="any">Any legacy</option>
						<option value="direct">Direct only</option>
					</select>
					<span className="text-xs text-muted-foreground">Min</span>
					<Input
						type="number"
						min={1}
						value={current?.value ?? ""}
						onChange={(e) => handleValueChange(e.target.value)}
						placeholder="any"
						className="h-7 text-sm"
					/>
				</div>
			</div>
		</FilterPopoverShell>
	);
}
