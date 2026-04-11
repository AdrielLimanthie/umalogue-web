type Props = {
	scenarioName: string;
	fans: number;
	wins: number;
	raceCount: number;
};

export function DetailCareer({ scenarioName, fans, wins, raceCount }: Props) {
	const stats = [
		{ label: "Scenario", value: scenarioName },
		{ label: "Fans", value: fans.toLocaleString() },
		{ label: "Wins", value: `${wins} / ${raceCount}` },
	];

	return (
		<section aria-label="Career">
			<h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
				Career
			</h2>
			<dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{stats.map(({ label, value }) => (
					<div
						key={label}
						className="rounded-lg border border-border bg-card p-3 flex flex-col gap-0.5"
					>
						<dt className="text-xs text-muted-foreground">{label}</dt>
						<dd className="text-sm font-semibold truncate">{value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
