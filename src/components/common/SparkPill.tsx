import { getSparkDescription, starString } from "@/lib/common";
import { cn } from "@/lib/utils";
import type { ParsedFactor } from "@/types/veteran";

export type SparkPillProps = {
	spark: ParsedFactor;
	isDirect?: boolean;
};

export function SparkPill({ spark, isDirect = false }: SparkPillProps) {
	const stars = starString(spark.level);

	let sparkBgClass = "bg-card text-foreground";
	switch (spark.color) {
		case "blue":
			sparkBgClass = "bg-spark-blue text-white";
			break;
		case "pink":
			sparkBgClass = "bg-spark-pink text-white";
			break;
		case "green":
			sparkBgClass = "bg-spark-green text-white";
			break;
	}

	const starsColorClass = isDirect
		? "text-spark-highlight text-shadow-[0px_0px_1px] text-shadow-shadow"
		: undefined;

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 border-2 border-foreground shadow-sm px-2 py-0.5 text-sm font-medium whitespace-nowrap",
				sparkBgClass,
			)}
			title={getSparkDescription(spark, isDirect)}
		>
			<span className="max-w-60 truncate">{spark.name_en}</span>
			<span className={cn("shrink-0", starsColorClass)}>{stars}</span>
		</span>
	);
}
