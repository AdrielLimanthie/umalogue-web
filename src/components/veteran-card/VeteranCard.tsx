"use client";

import { ArrowUpRight, GitCompareArrows, SquareCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { VeteranCardAptitudes } from "@/components/veteran-card/VeteranCardAptitudes";
import { VeteranCardImage } from "@/components/veteran-card/VeteranCardImage";
import { VeteranCardSparks } from "@/components/veteran-card/VeteranCardSparks";
import { VeteranCardStats } from "@/components/veteran-card/VeteranCardStats";
import { VeteranCardTags } from "@/components/veteran-card/VeteranCardTags";
import { starString } from "@/lib/common";
import { useUIStore } from "@/stores/use-ui-store";
import { useVeteranStore } from "@/stores/use-veteran-store";
import type { ProcessedVeteran } from "@/types/veteran";

type Props = {
	veteran: ProcessedVeteran;
	appliedTags: string[];
	isCompareMode: boolean;
	isSelected: boolean;
	canSelect: boolean;
	isAboveTheFold?: boolean;
};

export function VeteranCard({
	veteran,
	appliedTags,
	isCompareMode,
	isSelected,
	canSelect,
	isAboveTheFold,
}: Props) {
	const { addTag, removeTag, toggleCompare, compareSelection } =
		useVeteranStore();
	const { setCompareMode } = useUIStore();

	const handleEnterCompareMode = () => {
		setCompareMode(true);
		if (!compareSelection.includes(veteran.id)) {
			toggleCompare(veteran.id);
		}
	};
	return (
		<article className="bg-card text-card-foreground border-2 border-border shadow-md p-4 flex flex-col gap-3 w-full transition-[transform,box-shadow] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--foreground)]">
			{/* Top row: image | info+aptitudes | stats | buttons */}
			<div className="flex flex-row gap-3 items-stretch">
				<VeteranCardImage
					cardId={veteran.card_id}
					umaName={veteran.umaName}
					isAboveTheFold={isAboveTheFold}
				/>

				{/* Info 2×3 grid + aptitudes */}
				<div className="flex flex-col gap-2 min-w-96 flex-1">
					<div className="grid grid-cols-[min-content_min-content_min-content] gap-x-4 gap-y-0.5 text-sm">
						{/* row 1: title | rank | stars */}
						<p className="text-muted-foreground truncate">{veteran.umaTitle}</p>
						<p className="font-semibold text-foreground shrink-0">
							{veteran.rankLabel}
						</p>
						<p className="shrink-0 text-spark-highlight text-shadow-[0px_0px_1px] text-shadow-shadow tracking-wider">
							{starString(veteran.rarity)}
						</p>
						{/* row 2: name | score | potential */}
						<h3 className="font-semibold text-sm leading-tight truncate">
							{veteran.umaName}
						</h3>
						<p className="text-muted-foreground shrink-0">
							{veteran.rank_score.toLocaleString()}
						</p>
						<p className="text-muted-foreground shrink-0 text-nowrap">
							Potential Lvl {veteran.talent_level}
						</p>
					</div>

					<VeteranCardAptitudes aptitudes={veteran.aptitudes} />
				</div>

				{/* Stats */}
				<div className="flex-1 shrink-0">
					<VeteranCardStats
						speed={veteran.speed}
						stamina={veteran.stamina}
						power={veteran.power}
						guts={veteran.guts}
						wiz={veteran.wiz}
					/>
				</div>

				{/* Action buttons — top-right, stacked */}
				<div className="flex flex-col gap-2 shrink-0 w-28 ml-2">
					<ButtonLink
						href={`/detail/${veteran.id}`}
						target="_blank"
						variant="outline"
						size="lg"
						className="w-full"
					>
						<ArrowUpRight className="h-3.5 w-3.5" />
						Details
					</ButtonLink>
					{isCompareMode ? (
						<Button
							variant={isSelected ? "default" : "outline"}
							size="lg"
							className="w-full"
							onClick={() => {
								toggleCompare(veteran.id);
								if (isSelected && compareSelection.length === 1) {
									setCompareMode(false);
								}
							}}
							disabled={!isSelected && !canSelect}
						>
							{isSelected ? (
								<SquareCheckBig className="h-3.5 w-3.5" />
							) : (
								<GitCompareArrows className="h-3.5 w-3.5" />
							)}
							{isSelected ? "Comparing" : "Compare"}
						</Button>
					) : (
						<Button
							variant="outline"
							size="lg"
							className="w-full"
							onClick={handleEnterCompareMode}
						>
							<GitCompareArrows className="h-3.5 w-3.5" />
							Compare
						</Button>
					)}
				</div>
			</div>

			<Separator />

			{/* Sparks */}
			<VeteranCardSparks
				directLegacy={veteran.directLegacy}
				subLegacies={veteran.subLegacies}
			/>

			<Separator />

			{/* Tags */}
			<VeteranCardTags
				appliedTags={appliedTags}
				onAddTag={(tag) => addTag(veteran.id, tag)}
				onRemoveTag={(tag) => removeTag(veteran.id, tag)}
			/>
		</article>
	);
}
