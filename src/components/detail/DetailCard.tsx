import { RarityStars } from "@/components/common/RarityStars";
import { UmaImage } from "@/components/common/UmaImage";
import type { ProcessedVeteran } from "@/types/veteran";

type Props = {
	veteran: ProcessedVeteran;
};

export function DetailCard({ veteran }: Props) {
	return (
		<div className="flex flex-col sm:flex-row gap-5 items-start">
			<UmaImage
				cardId={veteran.card_id}
				umaName={veteran.umaName}
				sizes="160px"
				className="shrink-0 w-32 h-32 sm:w-40 sm:h-40"
				priority
			/>
			<div className="flex flex-col gap-1.5 min-w-0">
				<p className="text-sm text-muted-foreground">{veteran.umaTitle}</p>
				<h1 className="text-2xl font-bold leading-tight">{veteran.umaName}</h1>
				<div className="flex items-center gap-3 text-sm flex-wrap">
					<span className="font-semibold text-base">{veteran.rankLabel}</span>
					<span className="text-muted-foreground">
						{veteran.rank_score.toLocaleString()} pts
					</span>
				</div>
				<div className="flex items-center gap-3 text-sm flex-wrap">
					<RarityStars rarity={veteran.rarity} className="tracking-wider" />
					<span className="text-muted-foreground">
						Potential Lvl {veteran.talent_level}
					</span>
				</div>
			</div>
		</div>
	);
}
