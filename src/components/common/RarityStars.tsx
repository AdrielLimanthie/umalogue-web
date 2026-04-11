import { starString } from "@/lib/common";
import { cn } from "@/lib/utils";

type Props = {
	rarity: number;
	className?: string;
};

export function RarityStars({ rarity, className }: Props) {
	return (
		<span className={cn("text-yellow-500", className)}>
			{starString(rarity)}
		</span>
	);
}
