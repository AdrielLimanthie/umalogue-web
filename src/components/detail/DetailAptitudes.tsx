import { Fragment } from "react";
import { AptitudeBadge } from "@/components/common/AptitudeBadge";
import { APTITUDE_SECTIONS } from "@/constants/aptitudes";
import type { AptitudeSet } from "@/types/veteran";

type Props = {
	aptitudes: AptitudeSet;
};

export function DetailAptitudes({ aptitudes }: Props) {
	return (
		<section aria-label="Aptitudes">
			<h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
				Aptitudes
			</h2>
			<div className="grid grid-cols-[repeat(9,min-content)] gap-y-1 gap-x-2 text-sm">
				{APTITUDE_SECTIONS.map((section) => (
					<Fragment key={section.label}>
						<div className="col-start-1 w-20 flex items-center text-muted-foreground font-semibold">
							{section.label}
						</div>
						{section.rows.map(({ key, shortKey, aptitudeKey }) => (
							<Fragment key={key}>
								<span className="col-span-1 flex items-center ml-1 text-muted-foreground">
									{shortKey}
								</span>
								<AptitudeBadge
									label={aptitudes[aptitudeKey] as string}
									size="md"
								/>
							</Fragment>
						))}
					</Fragment>
				))}
			</div>
		</section>
	);
}
