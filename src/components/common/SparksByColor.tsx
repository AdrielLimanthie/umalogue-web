import { LegacySparkGroup } from "@/components/common/LegacySparkGroup";
import { SPARK_COLORS } from "@/constants/sparks";
import { cn } from "@/lib/utils";
import type { ProcessedLegacy } from "@/types/veteran";

type Props = {
	directLegacy: ProcessedLegacy;
	subLegacies: [ProcessedLegacy, ProcessedLegacy];
	rowGap?: string;
	labelClassName?: string;
};

export function SparksByColor({
	directLegacy,
	subLegacies,
	rowGap = "gap-2",
	labelClassName,
}: Props) {
	const allLegacies = [directLegacy, ...subLegacies];

	return (
		<>
			{SPARK_COLORS.map(({ color, label }) => {
				const hasSparks = allLegacies.some((legacy) =>
					legacy.sparks.some((spark) => spark.color === color),
				);
				if (!hasSparks) return null;

				return (
					<div key={color} className={cn("flex items-start", rowGap)}>
						<span
							className={cn(
								"text-muted-foreground w-10 shrink-0",
								labelClassName,
							)}
						>
							{label}
						</span>
						<div className="flex flex-wrap gap-1.5">
							{allLegacies.map((legacy, i) => (
								<LegacySparkGroup
									// biome-ignore lint/suspicious/noArrayIndexKey: stable index for legacy order
									key={i}
									legacy={legacy}
									color={color}
								/>
							))}
						</div>
					</div>
				);
			})}
		</>
	);
}
