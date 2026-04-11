"use client";

import debounce from "lodash.debounce";
import { Check, Plus, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { selectAllTags, useVeteranStore } from "@/stores/use-veteran-store";

type Props = {
	appliedTags: string[];
	onAddTag: (tag: string) => void;
	onRemoveTag: (tag: string) => void;
};

export function AddTagPopover({ appliedTags, onAddTag, onRemoveTag }: Props) {
	const allTags = useVeteranStore(useShallow(selectAllTags));
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const debouncedSetInput = useCallback(
		debounce((val: string) => setInput(val), 150),
		[],
	);

	const filtered = allTags.filter((tag) =>
		tag.toLowerCase().includes(input.toLowerCase()),
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const val = input.trim();
			if (val && !appliedTags.includes(val)) {
				onAddTag(val);
			}
		}
	};

	const toggleTag = (tag: string) => {
		if (appliedTags.includes(tag)) {
			onRemoveTag(tag);
		} else {
			onAddTag(tag);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors cursor-pointer hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				aria-label="Add tag"
			>
				<Plus className="h-3 w-3" />
			</PopoverTrigger>
			<PopoverContent className="w-64 p-3" align="start">
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm font-medium">Tags</span>
					<Button
						variant="ghost"
						size="icon"
						className="h-6 w-6"
						onClick={() => setOpen(false)}
						aria-label="Close tag popover"
					>
						<X className="h-3 w-3" />
					</Button>
				</div>

				<Input
					ref={inputRef}
					placeholder="Add or search tags…"
					className="h-8 text-sm mb-2"
					defaultValue=""
					onChange={(e) => debouncedSetInput(e.target.value)}
					onKeyDown={handleKeyDown}
					aria-label="Tag input"
				/>

				{filtered.length > 0 && (
					<ul className="flex flex-col gap-0.5 max-h-48 overflow-y-auto">
						{filtered.map((tag) => {
							const applied = appliedTags.includes(tag);
							return (
								<li key={tag}>
									<button
										type="button"
										className={cn(
											"w-full flex items-center gap-2 rounded px-2 py-1 text-sm text-left hover:bg-accent transition-colors",
											applied && "font-medium",
										)}
										onClick={() => toggleTag(tag)}
										aria-pressed={applied}
									>
										<Check
											className={cn(
												"h-3 w-3 shrink-0",
												applied ? "opacity-100" : "opacity-0",
											)}
										/>
										{tag}
									</button>
								</li>
							);
						})}
					</ul>
				)}

				{input.trim() && !allTags.includes(input.trim()) && (
					<button
						type="button"
						className="w-full mt-1 flex items-center gap-2 rounded px-2 py-1 text-sm text-left hover:bg-accent transition-colors text-muted-foreground"
						onClick={() => {
							const val = input.trim();
							onAddTag(val);
						}}
					>
						<Plus className="h-3 w-3" />
						Create &ldquo;{input.trim()}&rdquo;
					</button>
				)}
			</PopoverContent>
		</Popover>
	);
}
