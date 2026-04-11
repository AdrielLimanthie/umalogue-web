import { SparksByColor } from "@/components/common/SparksByColor";
import type { ProcessedLegacy } from "@/types/veteran";

type Props = {
	directLegacy: ProcessedLegacy;
	subLegacies: [ProcessedLegacy, ProcessedLegacy];
};

export function DetailSparks({ directLegacy, subLegacies }: Props) {
	return (
		<section aria-label="Sparks">
			<h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
				Sparks
			</h2>
			<div className="flex flex-col gap-2">
				<SparksByColor
					directLegacy={directLegacy}
					subLegacies={subLegacies}
					rowGap="gap-3"
					labelClassName="text-xs pt-1"
				/>
			</div>
		</section>
	);
}
