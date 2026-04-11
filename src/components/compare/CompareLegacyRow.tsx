import { RarityStars } from "@/components/common/RarityStars";
import { UmaImage } from "@/components/common/UmaImage";
import { RowLabel } from "@/components/compare/CompareCells";
import type { ProcessedLegacy, ProcessedVeteran } from "@/types/veteran";

export function CompareLegacyRow({
	left,
	right,
}: {
	left: ProcessedVeteran;
	right: ProcessedVeteran;
}) {
	const leftLegacies = left.subLegacies;
	const rightLegacies = right.subLegacies;
	return (
		<tr className="border-b border-border/50">
			<RowLabel label="Legacies" />
			<td className="px-3 py-2 align-top">
				<div className="flex flex-col gap-1">
					{leftLegacies.map((legacy, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: stable legacy order
						<LegacyMiniCard key={i} legacy={legacy} />
					))}
				</div>
			</td>
			<td className="px-3 py-2 align-top">
				<div className="flex flex-col gap-1">
					{rightLegacies.map((legacy, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: stable legacy order
						<LegacyMiniCard key={i} legacy={legacy} />
					))}
				</div>
			</td>
		</tr>
	);
}

function LegacyMiniCard({ legacy }: { legacy: ProcessedLegacy }) {
	return (
		<div className="flex items-center gap-1.5 rounded border border-border bg-muted/30 p-1.5">
			<UmaImage
				cardId={legacy.card_id}
				umaName={legacy.umaName}
				sizes="32px"
				className="w-8 h-8 rounded shrink-0"
			/>
			<div className="min-w-0">
				<p className="text-xs font-medium truncate">{legacy.umaName}</p>
				<p className="text-xs">
					<RarityStars rarity={legacy.rarity} />
				</p>
			</div>
		</div>
	);
}
