import { Fragment } from "react";
import { AptitudeBadge } from "@/components/common/AptitudeBadge";
import { APTITUDE_SECTIONS } from "@/constants/aptitudes";
import { cn } from "@/lib/utils";
import type { AptitudeSet } from "@/types/veteran";

type Props = {
	aptitudes: AptitudeSet;
};

export function VeteranCardAptitudes({ aptitudes }: Props) {
	return (
		<div className="grid grid-cols-[repeat(9,min-content)] gap-y-1 gap-x-2 text-sm">
			{APTITUDE_SECTIONS.map((section) => (
				<Fragment key={section.label}>
					{section.rows.map(({ key, shortKey, aptitudeKey }, index) => (
						<Fragment key={key}>
							<span
								className={cn(
									"col-span-1 flex items-center text-muted-foreground",
									index === 0 && "col-start-1",
									index > 0 && "ml-1",
								)}
							>
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
	);
}
