"use client";

import { ChevronDown } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
	label: string;
	active?: boolean;
	children: React.ReactNode;
	align?: "start" | "center" | "end";
	contentClassName?: string;
};

export function FilterPopoverShell({
	label,
	active = false,
	children,
	align = "start",
	contentClassName,
}: Props) {
	return (
		<Popover>
			<PopoverTrigger
				className={cn(
					"inline-flex h-8 items-center gap-1 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
					active && "border-primary text-primary",
				)}
				aria-pressed={active}
			>
				{label}
				{active && (
					<span
						className="h-1.5 w-1.5 bg-primary shrink-0"
						aria-hidden="true"
					/>
				)}
				<ChevronDown className="h-3 w-3 opacity-60" aria-hidden="true" />
			</PopoverTrigger>
			<PopoverContent
				className={cn("w-64 p-3", contentClassName)}
				align={align}
			>
				{children}
			</PopoverContent>
		</Popover>
	);
}
