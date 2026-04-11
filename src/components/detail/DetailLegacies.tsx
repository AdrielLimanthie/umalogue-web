import { RarityStars } from "@/components/common/RarityStars";
import { SparkPill } from "@/components/common/SparkPill";
import { UmaImage } from "@/components/common/UmaImage";
import { cn } from "@/lib/utils";
import type { ProcessedLegacy } from "@/types/veteran";

type Props = {
	directLegacy: ProcessedLegacy;
	subLegacies: [ProcessedLegacy, ProcessedLegacy];
};

export function DetailLegacies({ directLegacy, subLegacies }: Props) {
	return (
		<section aria-label="Legacies">
			<h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
				Legacies
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				<LegacyCard legacy={directLegacy} />
				{subLegacies.map((legacy, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: stable index for legacy order
					<LegacyCard key={i} legacy={legacy} />
				))}
			</div>
		</section>
	);
}

type LegacyCardProps = {
	legacy: ProcessedLegacy;
};

function LegacyCard({ legacy }: LegacyCardProps) {
	const hasSparks = legacy.sparks.length > 0;
	return (
		<div
			className={cn(
				"rounded-lg border border-border bg-card p-3 flex flex-col gap-2",
				legacy.isDirectLegacy && "border-primary/40 bg-primary/5",
			)}
		>
			<div className="flex items-center gap-2">
				<UmaImage
					cardId={legacy.card_id}
					umaName={legacy.umaName}
					sizes="40px"
					className="shrink-0 w-10 h-10 rounded"
				/>
				<div className="min-w-0">
					<p className="text-md font-medium truncate">{legacy.umaName}</p>
					<p className="text-sm">
						<RarityStars rarity={legacy.rarity} />
					</p>
				</div>
			</div>
			{hasSparks && (
				<div className="flex flex-wrap gap-1">
					{legacy.sparks.map((spark) => (
						<SparkPill
							key={`${spark.factor_id}-${spark.level}`}
							spark={spark}
							isDirect={legacy.isDirectLegacy}
						/>
					))}
				</div>
			)}
			{!hasSparks && (
				<p className="text-xs text-muted-foreground">No sparks.</p>
			)}
		</div>
	);
}
