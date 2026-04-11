import { SparkPill } from "@/components/common/SparkPill";
import type { ProcessedLegacy } from "@/types/veteran";

type Props = {
	legacy: ProcessedLegacy;
	color: "blue" | "pink" | "green" | "white";
};

export function LegacySparkGroup({ legacy, color }: Props) {
	const sparks = legacy.sparks.filter((s) => s.color === color);
	if (sparks.length === 0) return null;
	return (
		<>
			{sparks.map((s) => (
				<SparkPill
					key={`${s.factor_id}-${s.level}`}
					spark={s}
					isDirect={legacy.isDirectLegacy}
				/>
			))}
		</>
	);
}
