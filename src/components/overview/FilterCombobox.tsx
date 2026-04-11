"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ComboboxOption = {
	value: string;
	label: string;
	sublabel?: string;
};

type BaseProps = {
	options: ComboboxOption[];
	triggerLabel: string;
	placeholder?: string;
	hideActiveIndicator?: boolean;
	triggerClassName?: string;
};

type SingleProps = BaseProps & {
	multiple?: false;
	value: string;
	onChange: (v: string) => void;
};

type MultiProps = BaseProps & {
	multiple: true;
	value: string[];
	onChange: (v: string[]) => void;
};

type Props = SingleProps | MultiProps;

export function FilterCombobox({
	options,
	triggerLabel,
	placeholder = "Search…",
	hideActiveIndicator,
	triggerClassName,
	...rest
}: Props) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const listRef = useRef<HTMLDivElement>(null);

	const isMulti = rest.multiple === true;
	const multiValue = isMulti ? (rest.value as string[]) : [];
	const singleValue = !isMulti ? (rest.value as string) : "";

	const active = isMulti ? multiValue.length > 0 : singleValue !== "";

	const filtered = useMemo(() => {
		return query.trim() === ""
			? options
			: options.filter((option) => {
					const searchTarget =
						`${option.label} ${option.sublabel ?? ""}`.toLowerCase();
					return searchTarget.includes(query.toLowerCase());
				});
	}, [query, options]);

	const selectedLabel =
		!isMulti && active
			? (options.find((o) => o.value === singleValue)?.label ?? singleValue)
			: null;

	const triggerText =
		isMulti && active
			? `${triggerLabel} (${multiValue.length})`
			: (selectedLabel ?? triggerLabel);

	// Reset highlight when filtered list changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset trigger
	useEffect(() => {
		setHighlightedIndex(-1);
	}, [filtered]);

	// Scroll highlighted item into view
	useEffect(() => {
		if (highlightedIndex < 0 || !listRef.current) return;
		const item = listRef.current.children[highlightedIndex] as
			| HTMLElement
			| undefined;
		item?.scrollIntoView({ block: "nearest" });
	}, [highlightedIndex]);

	function select(option: ComboboxOption) {
		if (isMulti) {
			const onChange = rest.onChange as (v: string[]) => void;
			const next = multiValue.includes(option.value)
				? multiValue.filter((v) => v !== option.value)
				: [...multiValue, option.value];
			onChange(next);
			// Stay open and keep query so the user can keep navigating the filtered list
		} else {
			const onChange = rest.onChange as (v: string) => void;
			onChange(option.value);
			setQuery("");
			setHighlightedIndex(-1);
			setOpen(false);
		}
	}

	function removeValue(val: string) {
		if (!isMulti) return;
		const onChange = rest.onChange as (v: string[]) => void;
		onChange(multiValue.filter((v) => v !== val));
	}

	function handleOpenChange(next: boolean) {
		setOpen(next);
		if (!next) {
			setQuery("");
			setHighlightedIndex(-1);
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightedIndex((i) => Math.max(i - 1, 0));
		} else if (e.key === "Enter" && highlightedIndex >= 0) {
			e.preventDefault();
			select(filtered[highlightedIndex]);
		} else if (e.key === "Escape") {
			setOpen(false);
		}
	}

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			<PopoverTrigger
				className={cn(
					"inline-flex h-8 items-center gap-1 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
					active && "border-primary text-primary",
					triggerClassName,
				)}
				aria-pressed={active}
			>
				<span className="max-w-28 truncate">{triggerText}</span>
				{active && !hideActiveIndicator && (
					<span
						className="h-1.5 w-1.5 rounded-full bg-primary shrink-0"
						aria-hidden="true"
					/>
				)}
				<ChevronDown
					className="h-3 w-3 opacity-60 shrink-0"
					aria-hidden="true"
				/>
			</PopoverTrigger>

			<PopoverContent className="w-64 p-2" align="start">
				{/* Selected pills — multi mode only */}
				{isMulti && multiValue.length > 0 && (
					<div className="flex flex-wrap gap-1 mb-2">
						{multiValue.map((val) => {
							const label = options.find((o) => o.value === val)?.label ?? val;
							return (
								<span
									key={val}
									className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-medium"
								>
									{label}
									<button
										type="button"
										onClick={() => removeValue(val)}
										className="hover:text-destructive"
										aria-label={`Remove ${label}`}
									>
										<X className="h-2.5 w-2.5" />
									</button>
								</span>
							);
						})}
					</div>
				)}

				<Input
					autoFocus
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className="h-8 text-sm mb-2"
				/>
				<div ref={listRef} className="max-h-52 overflow-y-auto">
					{filtered.length === 0 ? (
						<p className="px-2 py-3 text-xs text-muted-foreground text-center">
							No results
						</p>
					) : (
						filtered.map((option, index) => {
							const isSelected = isMulti
								? multiValue.includes(option.value)
								: option.value === singleValue;
							return (
								<button
									key={option.value}
									type="button"
									onClick={() => select(option)}
									className={cn(
										"w-full text-left px-2 py-1.5 rounded-sm text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
										isSelected && "bg-accent text-accent-foreground",
										index === highlightedIndex &&
											"bg-accent text-accent-foreground",
									)}
								>
									<span className="block truncate">{option.label}</span>
									{option.sublabel && (
										<span className="block truncate text-xs text-muted-foreground">
											{option.sublabel}
										</span>
									)}
								</button>
							);
						})
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
