import { CompareAptitudeRow } from "@/components/compare/CompareAptitudeRow";
import { SectionHeading } from "@/components/compare/CompareCells";
import { CompareHeaderRow } from "@/components/compare/CompareHeaderRow";
import { CompareLegacyRow } from "@/components/compare/CompareLegacyRow";
import { CompareSparkRow } from "@/components/compare/CompareSparkRow";
import { CompareStatRow } from "@/components/compare/CompareStatRow";
import { CompareValueRow } from "@/components/compare/CompareValueRow";
import { APTITUDE_ROWS } from "@/constants/aptitudes";
import { STAT_DEFS } from "@/constants/stats";
import type { ProcessedVeteran } from "@/types/veteran";

type Props = {
	left: ProcessedVeteran;
	right: ProcessedVeteran;
};

export function CompareTable({ left, right }: Props) {
	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full table-fixed border-collapse text-sm">
				<colgroup>
					<col className="w-28" />
					<col />
					<col />
				</colgroup>
				<thead>
					<CompareHeaderRow left={left} right={right} />
				</thead>
				<tbody>
					{/* Stats */}
					<SectionHeading label="Stats" />
					{STAT_DEFS.map(({ fullLabel, key, colorClass }) => (
						<CompareStatRow
							key={key}
							label={fullLabel}
							left={left[key]}
							right={right[key]}
							colorClass={colorClass}
						/>
					))}

					{/* Aptitudes */}
					<SectionHeading label="Aptitudes" />
					{APTITUDE_ROWS.map(({ label, valueKey, labelKey }) => (
						<CompareAptitudeRow
							key={label}
							label={label}
							leftValue={left.aptitudes[valueKey] as number}
							rightValue={right.aptitudes[valueKey] as number}
							leftLabel={left.aptitudes[labelKey] as string}
							rightLabel={right.aptitudes[labelKey] as string}
						/>
					))}

					{/* Career */}
					<SectionHeading label="Career" />
					<CompareValueRow
						label="Scenario"
						left={left.scenarioName}
						right={right.scenarioName}
						higherIsBetter={false}
					/>
					<CompareValueRow label="Fans" left={left.fans} right={right.fans} />
					<CompareValueRow label="Wins" left={left.wins} right={right.wins} />
					<CompareValueRow
						label="Races"
						left={left.race_count}
						right={right.race_count}
					/>
					<CompareValueRow
						label="Rank"
						left={left.rankLabel}
						right={right.rankLabel}
						higherIsBetter={false}
					/>
					<CompareValueRow
						label="Rank Score"
						left={left.rank_score}
						right={right.rank_score}
					/>

					{/* Legacies */}
					<SectionHeading label="Legacies" />
					<CompareLegacyRow left={left} right={right} />

					{/* Sparks */}
					<SectionHeading label="Sparks" />
					<CompareSparkRow left={left} right={right} />
				</tbody>
			</table>
		</div>
	);
}
