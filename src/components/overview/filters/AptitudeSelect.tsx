import { gameData } from "@/lib/game-data";

type Props = {
	value: number | null;
	onChange: (val: number | null) => void;
	id?: string;
	label: string;
};

const OPTIONS = [
	{ value: null, label: "Any" },
	...gameData.aptitudes.map((a) => ({
		value: a.aptitude,
		label: a.aptitude_label,
	})),
];

export function AptitudeSelect({ value, onChange, id, label }: Props) {
	return (
		<div className="flex items-center gap-2">
			<label
				htmlFor={id}
				className="text-xs text-muted-foreground w-24 shrink-0"
			>
				{label}
			</label>
			<select
				id={id}
				value={value ?? ""}
				onChange={(e) =>
					onChange(e.target.value === "" ? null : Number(e.target.value))
				}
				className="flex-1 h-7 rounded-md border border-input bg-background text-sm px-2 focus:outline-none focus:ring-1 focus:ring-ring"
			>
				{OPTIONS.map((opt) => (
					<option key={opt.label} value={opt.value ?? ""}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}
