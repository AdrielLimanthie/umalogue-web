import { APTITUDE_COLOR } from "@/constants/aptitudes";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
	sm: "px-1.5 py-0.5 text-xs min-w-6",
	md: "px-1 py-0.5 text-sm min-w-6",
	lg: "px-2 py-1 text-sm min-w-8",
};

export function AptitudeBadge({
	label,
	size = "md",
}: {
	label: string;
	size?: Size;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center font-bold",
				SIZE_CLASS[size],
				APTITUDE_COLOR[label] ?? "bg-muted text-muted-foreground",
			)}
		>
			{label}
		</span>
	);
}
