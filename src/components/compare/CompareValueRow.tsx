import { RowLabel } from "@/components/compare/CompareCells";
import { cn } from "@/lib/utils";

export function CompareValueRow({
	label,
	left,
	right,
	higherIsBetter = true,
}: {
	label: string;
	left: string | number;
	right: string | number;
	higherIsBetter?: boolean;
}) {
	const leftNum = typeof left === "number" ? left : Number.NaN;
	const rightNum = typeof right === "number" ? right : Number.NaN;
	const comparable =
		!Number.isNaN(leftNum) && !Number.isNaN(rightNum) && leftNum !== rightNum;
	const leftBetter =
		comparable && (higherIsBetter ? leftNum > rightNum : leftNum < rightNum);
	const rightBetter =
		comparable && (higherIsBetter ? rightNum > leftNum : rightNum < leftNum);

	return (
		<tr className="border-b border-border/50">
			<RowLabel label={label} />
			<td
				className={cn(
					"px-3 py-1.5 text-sm align-middle",
					leftBetter && "bg-primary/5 font-bold",
				)}
			>
				{typeof left === "number" ? left.toLocaleString() : left}
			</td>
			<td
				className={cn(
					"px-3 py-1.5 text-sm align-middle",
					rightBetter && "bg-primary/5 font-bold",
				)}
			>
				{typeof right === "number" ? right.toLocaleString() : right}
			</td>
		</tr>
	);
}
