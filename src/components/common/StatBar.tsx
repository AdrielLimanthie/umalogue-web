type Props = {
	label: string;
	fullLabel: string;
	value: number;
	colorClass: string;
	maxStat: number;
};

export function StatBar({
	label,
	fullLabel,
	value,
	colorClass,
	maxStat,
}: Props) {
	const fillPercent = Math.min((value / maxStat) * 100, 100);
	return (
		<div className="flex items-center gap-3 text-sm">
			<span
				className="w-10 shrink-0 font-medium text-muted-foreground text-xs"
				title={fullLabel}
			>
				{label}
			</span>
			<div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
				<div
					className={`h-full rounded-full ${colorClass}`}
					style={{ width: `${fillPercent}%` }}
					role="progressbar"
					aria-valuenow={value}
					aria-valuemin={0}
					aria-valuemax={maxStat}
					aria-label={`${fullLabel}: ${value}`}
				/>
			</div>
			<span className="w-14 text-right tabular-nums font-medium">
				{value.toLocaleString()}
			</span>
		</div>
	);
}
