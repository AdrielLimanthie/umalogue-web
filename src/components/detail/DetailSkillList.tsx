import { SkillIcon } from "@/components/common/SkillIcon";
import type { ProcessedSkill } from "@/types/veteran";

const RARITY_LABEL: Record<number, string> = {
	1: "Normal",
	2: "Rare",
	3: "Unique",
	4: "Unique",
	5: "Unique",
};

const RARITY_COLOR: Record<number, string> = {
	1: "text-muted-foreground",
	2: "text-blue-500",
	3: "text-yellow-500",
	4: "text-purple-500",
};

type Props = {
	skills: ProcessedSkill[];
};

export function DetailSkillList({ skills }: Props) {
	if (skills.length === 0) {
		return (
			<section aria-label="Skills">
				<h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
					Skills
				</h2>
				<p className="text-sm text-muted-foreground">No skills.</p>
			</section>
		);
	}

	return (
		<section aria-label="Skills">
			<h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
				Skills ({skills.length})
			</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
				{skills.map((skill) => (
					<li
						key={`${skill.skill_id}-${skill.level}`}
						className="flex items-center gap-2 rounded-md border border-border bg-card p-2"
					>
						<SkillIcon iconid={skill.iconid} name={skill.name_en} />
						<div className="min-w-0 flex-1">
							<p className="text-sm font-medium truncate">{skill.name_en}</p>
							<p
								className={`text-xs ${RARITY_COLOR[skill.rarity] ?? "text-muted-foreground"}`}
							>
								{RARITY_LABEL[skill.rarity] ?? `Rarity ${skill.rarity}`}
								{skill.level > 1 && ` • Lv.${skill.level}`}
							</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
