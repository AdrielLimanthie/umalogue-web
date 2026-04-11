import { StatBar } from "@/components/common/StatBar";
import { MAX_STAT_CARD, STAT_DEFS } from "@/constants/stats";

type StatValues = {
	speed: number;
	stamina: number;
	power: number;
	guts: number;
	wiz: number;
};

type Props = StatValues;

export function DetailStats({ speed, stamina, power, guts, wiz }: Props) {
	const values = { speed, stamina, power, guts, wiz };
	return (
		<section aria-label="Stats">
			<h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
				Stats
			</h2>
			<div className="flex flex-col gap-2">
				{STAT_DEFS.map(({ key, label, fullLabel, colorClass }) => (
					<StatBar
						key={key}
						label={label}
						fullLabel={fullLabel}
						value={values[key]}
						colorClass={colorClass}
						maxStat={MAX_STAT_CARD}
					/>
				))}
			</div>
		</section>
	);
}
