"use client";

import { use } from "react";
import { BackToOverviewLink } from "@/components/common/BackToOverviewLink";
import { DetailAptitudes } from "@/components/detail/DetailAptitudes";
import { DetailCard } from "@/components/detail/DetailCard";
import { DetailCareer } from "@/components/detail/DetailCareer";
import { DetailLegacies } from "@/components/detail/DetailLegacies";
import { DetailSkillList } from "@/components/detail/DetailSkillList";
import { DetailSparks } from "@/components/detail/DetailSparks";
import { DetailStats } from "@/components/detail/DetailStats";
import { Container } from "@/components/layout/Container";
import { Separator } from "@/components/ui/separator";
import { useVeteranStore } from "@/stores/use-veteran-store";

type Props = {
	params: Promise<{ veteranId: string }>;
};

export default function DetailPage({ params }: Props) {
	const { veteranId } = use(params);
	const veteran = useVeteranStore((s) =>
		s.veterans.find((v) => v.id === veteranId),
	);

	if (!veteran) {
		return (
			<Container className="py-12">
				<BackToOverviewLink />
				<p className="text-center text-muted-foreground py-24">
					Veteran not found. They may have been removed.
				</p>
			</Container>
		);
	}

	return (
		<Container className="py-8">
			<BackToOverviewLink />

			<div className="flex flex-col gap-6">
				<DetailCard veteran={veteran} />

				<Separator />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<DetailStats
						speed={veteran.speed}
						stamina={veteran.stamina}
						power={veteran.power}
						guts={veteran.guts}
						wiz={veteran.wiz}
					/>
					<DetailAptitudes aptitudes={veteran.aptitudes} />
				</div>

				<Separator />

				<DetailCareer
					scenarioName={veteran.scenarioName}
					fans={veteran.fans}
					wins={veteran.wins}
					raceCount={veteran.race_count}
				/>

				<Separator />

				<DetailSparks
					directLegacy={veteran.directLegacy}
					subLegacies={veteran.subLegacies}
				/>

				<Separator />

				<DetailLegacies
					directLegacy={veteran.directLegacy}
					subLegacies={veteran.subLegacies}
				/>

				<Separator />

				<DetailSkillList skills={veteran.skills} />
			</div>
		</Container>
	);
}
