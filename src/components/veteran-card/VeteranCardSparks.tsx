import { SparksByColor } from "@/components/common/SparksByColor";
import type { ProcessedLegacy } from "@/types/veteran";

type Props = {
	directLegacy: ProcessedLegacy;
	subLegacies: [ProcessedLegacy, ProcessedLegacy];
};

export function VeteranCardSparks({ directLegacy, subLegacies }: Props) {
	return (
		<div className="flex flex-col gap-1.5">
			<SparksByColor
				directLegacy={directLegacy}
				subLegacies={subLegacies}
				rowGap="gap-2"
				labelClassName="text-sm"
			/>
		</div>
	);
}
