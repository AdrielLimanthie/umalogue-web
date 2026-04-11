export function SectionHeading({ label }: { label: string }) {
	return (
		<tr>
			<th
				colSpan={3}
				className="bg-muted/50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
			>
				{label}
			</th>
		</tr>
	);
}

export function RowLabel({ label }: { label: string }) {
	return (
		<td className="w-28 shrink-0 px-3 py-1.5 text-xs text-muted-foreground align-middle">
			{label}
		</td>
	);
}
