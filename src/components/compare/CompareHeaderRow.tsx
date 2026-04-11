import { RarityStars } from "@/components/common/RarityStars";
import { UmaImage } from "@/components/common/UmaImage";
import type { ProcessedVeteran } from "@/types/veteran";

export function CompareHeaderRow({
	left,
	right,
}: {
	left: ProcessedVeteran;
	right: ProcessedVeteran;
}) {
	return (
		<tr>
			<td className="w-28 px-3 py-3" />
			<VeteranCell veteran={left} />
			<VeteranCell veteran={right} />
		</tr>
	);
}

function VeteranCell({ veteran }: { veteran: ProcessedVeteran }) {
	return (
		<th scope="col" className="px-3 py-3 align-top font-normal">
			<div className="flex flex-col items-center gap-2 text-center">
				<UmaImage
					cardId={veteran.card_id}
					umaName={veteran.umaName}
					sizes="80px"
					className="w-20 h-20 rounded-lg shrink-0"
				/>
				<div>
					<p className="text-xs text-muted-foreground">{veteran.umaTitle}</p>
					<p className="text-sm font-semibold leading-tight">
						{veteran.umaName}
					</p>
					<p className="text-xs text-muted-foreground mt-0.5">
						{veteran.rankLabel} • {veteran.rank_score.toLocaleString()}
					</p>
					<p className="text-xs">
						<RarityStars rarity={veteran.rarity} /> Potential Level{" "}
						{veteran.talent_level}
					</p>
				</div>
			</div>
		</th>
	);
}
