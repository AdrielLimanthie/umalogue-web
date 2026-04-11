"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BackToOverviewLink } from "@/components/common/BackToOverviewLink";
import { CompareTable } from "@/components/compare/CompareTable";
import { Container } from "@/components/layout/Container";
import { useVeteranStore } from "@/stores/use-veteran-store";

export default function ComparePage() {
	return (
		<Container className="py-8">
			<BackToOverviewLink />

			<h1 className="text-xl font-bold mb-6">Compare</h1>

			<Suspense>
				<ComparePageContent />
			</Suspense>
		</Container>
	);
}

function ComparePageContent() {
	const searchParams = useSearchParams();
	const rawIds = searchParams.get("veteranIds") ?? "";
	const ids = rawIds
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);

	const veterans = useVeteranStore((s) => s.veterans);
	const leftVeteran = veterans.find((v) => v.id === ids[0]);
	const rightVeteran = veterans.find((v) => v.id === ids[1]);

	if (!leftVeteran || !rightVeteran) {
		return (
			<p className="text-center text-muted-foreground py-24">
				{ids.length < 2
					? "Please select two veterans to compare."
					: "One or both veterans could not be found. They may have been removed."}
			</p>
		);
	}

	return <CompareTable left={leftVeteran} right={rightVeteran} />;
}
