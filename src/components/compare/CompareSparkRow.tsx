import { SparkPill } from "@/components/common/SparkPill";
import { RowLabel } from "@/components/compare/CompareCells";
import { SPARK_COLORS } from "@/constants/sparks";
import type {
	ParsedFactor,
	ProcessedLegacy,
	ProcessedVeteran,
} from "@/types/veteran";

export function CompareSparkRow({
	left,
	right,
}: {
	left: ProcessedVeteran;
	right: ProcessedVeteran;
}) {
	const leftLegacies = [left.directLegacy, ...left.subLegacies];
	const rightLegacies = [right.directLegacy, ...right.subLegacies];

	return (
		<>
			{SPARK_COLORS.map(({ color, label }) => {
				const leftHas = leftLegacies.some((legacy) =>
					legacy.sparks.some((s) => s.color === color),
				);
				const rightHas = rightLegacies.some((legacy) =>
					legacy.sparks.some((s) => s.color === color),
				);
				if (!leftHas && !rightHas) return null;
				return (
					<tr key={color} className="border-b border-border/50">
						<RowLabel label={label} />
						<SparkCell legacies={leftLegacies} color={color} />
						<SparkCell legacies={rightLegacies} color={color} />
					</tr>
				);
			})}
		</>
	);
}

function SparkCell({
	legacies,
	color,
}: {
	legacies: ProcessedLegacy[];
	color: "blue" | "pink" | "green" | "white";
}) {
	const sparks: { spark: ParsedFactor; isDirect: boolean }[] = legacies.flatMap(
		(legacy) =>
			legacy.sparks
				.filter((s) => s.color === color)
				.map((s) => ({ spark: s, isDirect: legacy.isDirectLegacy })),
	);

	return (
		<td className="px-3 py-2 align-top">
			{sparks.length === 0 ? (
				<span className="text-xs text-muted-foreground">—</span>
			) : (
				<div className="flex flex-wrap gap-1">
					{sparks.map(({ spark, isDirect }, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: positional spark list
						<SparkPill key={i} spark={spark} isDirect={isDirect} />
					))}
				</div>
			)}
		</td>
	);
}
