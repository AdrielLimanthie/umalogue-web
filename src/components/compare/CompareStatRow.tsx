import { RowLabel } from "@/components/compare/CompareCells";
import { MAX_STAT_CARD } from "@/constants/stats";
import { cn } from "@/lib/utils";

export function CompareStatRow({
	label,
	left,
	right,
	colorClass,
}: {
	label: string;
	left: number;
	right: number;
	colorClass: string;
}) {
	const max = Math.max(left, right);

	return (
		<tr className="border-b border-border/50">
			<RowLabel label={label} />
			<StatCell
				value={left}
				max={max}
				isTied={left === right}
				colorClass={colorClass}
			/>
			<StatCell
				value={right}
				max={max}
				isTied={left === right}
				colorClass={colorClass}
			/>
		</tr>
	);
}

function StatCell({
	value,
	max,
	isTied,
	colorClass,
}: {
	value: number;
	max: number;
	isTied: boolean;
	colorClass: string;
}) {
	const isBetter = value === max && !isTied;
	const percentage = Math.min((value / MAX_STAT_CARD) * 100, 100);
	return (
		<td className={cn("px-3 py-1.5 align-middle", isBetter && "bg-primary/5")}>
			<div className="flex items-center gap-2 text-sm">
				<div className="flex-1 h-2 bg-muted border border-border overflow-hidden">
					<div
						className={`h-full ${colorClass}`}
						style={{ width: `${percentage}%` }}
						role="progressbar"
						aria-valuenow={value}
						aria-valuemin={0}
						aria-valuemax={MAX_STAT_CARD}
					/>
				</div>
				<span
					className={cn(
						"w-12 text-right tabular-nums text-xs",
						isBetter && "font-bold text-foreground",
					)}
				>
					{value.toLocaleString()}
				</span>
			</div>
		</td>
	);
}
