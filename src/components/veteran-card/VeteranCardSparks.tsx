import { SparksByColor } from "@/components/common/SparksByColor";
import type { ProcessedLegacy } from "@/types/veteran";

type Props = {
	directLegacy: ProcessedLegacy;
	subLegacies: [ProcessedLegacy, ProcessedLegacy];
};

export function VeteranCardSparks({ directLegacy, subLegacies }: Props) {
	const totalWhite = [
		...directLegacy.sparks,
		...subLegacies.flatMap((l) => l.sparks),
	].filter((s) => s.color === "white").length;
	const directWhite = directLegacy.sparks.filter(
		(s) => s.color === "white",
	).length;

	return (
		<div className="flex flex-col gap-1.5">
			<SparksByColor
				directLegacy={directLegacy}
				subLegacies={subLegacies}
				rowGap="gap-2"
				labelClassName="text-sm"
			/>
			{totalWhite > 0 && (
				<p className="mt-2 text-xs text-muted-foreground">
					White sparks: {totalWhite} total, {directWhite} direct
				</p>
			)}
		</div>
	);
}
