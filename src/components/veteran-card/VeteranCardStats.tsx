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

export function VeteranCardStats({ speed, stamina, power, guts, wiz }: Props) {
	const values = { speed, stamina, power, guts, wiz };
	return (
		<div className="flex flex-col justify-between h-full gap-1">
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
	);
}
