import { AptitudeBadge } from "@/components/common/AptitudeBadge";
import { RowLabel } from "@/components/compare/CompareCells";
import { cn } from "@/lib/utils";

export function CompareAptitudeRow({
	label,
	leftValue,
	rightValue,
	leftLabel,
	rightLabel,
}: {
	label: string;
	leftValue: number;
	rightValue: number;
	leftLabel: string;
	rightLabel: string;
}) {
	const leftBetter = leftValue > rightValue;
	const rightBetter = rightValue > leftValue;
	return (
		<tr className="border-b border-border/50">
			<RowLabel label={label} />
			<td
				className={cn(
					"px-3 py-1.5 align-middle text-center",
					leftBetter && "bg-primary/5",
				)}
			>
				<AptitudeBadge label={leftLabel} size="sm" />
			</td>
			<td
				className={cn(
					"px-3 py-1.5 align-middle text-center",
					rightBetter && "bg-primary/5",
				)}
			>
				<AptitudeBadge label={rightLabel} size="sm" />
			</td>
		</tr>
	);
}
