"use client";

import { GitCompareArrows, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
	selectedIds: string[];
	onCancel: () => void;
};

export function CompareFloatingBar({ selectedIds, onCancel }: Props) {
	const router = useRouter();

	const handleCompare = () => {
		router.push(`/compare?veteranIds=${selectedIds.join(",")}`);
	};

	return (
		<output
			className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full shadow-lg px-4 py-2"
			aria-live="polite"
		>
			<span className="text-sm text-primary-foreground/70">
				{selectedIds.length}/2 selected
			</span>
			{selectedIds.length === 2 && (
				<Button size="sm" variant="secondary" onClick={handleCompare}>
					<GitCompareArrows className="h-4 w-4" />
					Compare
				</Button>
			)}
			<Button
				variant="ghost"
				size="icon"
				className="h-7 w-7 rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground"
				onClick={onCancel}
				aria-label="Cancel comparison mode"
			>
				<X className="h-3 w-3" />
			</Button>
		</output>
	);
}
