import { getSparkDescription, starString } from "@/lib/common";
import { cn } from "@/lib/utils";
import type { ParsedFactor } from "@/types/veteran";

export type SparkPillProps = {
	spark: ParsedFactor;
	isDirect?: boolean;
};

export function SparkPill({ spark, isDirect = false }: SparkPillProps) {
	const stars = starString(spark.level);

	let sparkColorClass = "border-foreground text-foreground";
	switch (spark.color) {
		case "blue":
			sparkColorClass = "border-spark-blue text-spark-blue";
			break;
		case "pink":
			sparkColorClass = "border-spark-pink text-spark-pink";
			break;
		case "green":
			sparkColorClass = "border-spark-green text-spark-green";
			break;
	}

	const starsColorClass = isDirect
		? "text-spark-highlight text-shadow-[0px_0px_1px] text-shadow-shadow"
		: undefined;

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-full border-2 px-2 py-0.5 text-sm font-medium",
				sparkColorClass,
			)}
			title={getSparkDescription(spark, isDirect)}
		>
			<span className="max-w-60 truncate">{spark.name_en}</span>
			<span className={cn("shrink-0", starsColorClass)}>{stars}</span>
		</span>
	);
}
