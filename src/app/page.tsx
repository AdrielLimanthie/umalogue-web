"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Container } from "@/components/layout/Container";
import { CompareFloatingBar } from "@/components/overview/CompareFloatingBar";
import { EmptyState } from "@/components/overview/EmptyState";
import { FilterBar } from "@/components/overview/FilterBar";
import { ScrollToTopButton } from "@/components/overview/ScrollToTopButton";
import { UploadCard } from "@/components/overview/UploadCard";
import { VeteranCard } from "@/components/veteran-card/VeteranCard";
import { filterVeterans } from "@/lib/filter-veterans";
import { VeteranUploadSchema } from "@/lib/schemas";
import { sortVeterans } from "@/lib/sort-veterans";
import { useUIStore } from "@/stores/use-ui-store";
import { useVeteranStore } from "@/stores/use-veteran-store";

export default function OverviewPage() {
	const { veterans, tags, compareSelection, upsertVeterans, clearCompare } =
		useVeteranStore();
	const { filters, sort, isCompareMode, setCompareMode } = useUIStore();

	const filteredAndSorted = useMemo(() => {
		const filtered = filterVeterans(veterans, filters, tags);
		return sortVeterans(filtered, sort);
	}, [veterans, filters, sort, tags]);

	const [visibleCount, setVisibleCount] = useState(10);
	const sentinelRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: filteredAndSorted is a change trigger, not consumed inside
	useEffect(() => {
		setVisibleCount(10);
	}, [filteredAndSorted]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: filteredAndSorted is a change trigger to re-attach the observer after reset
	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setVisibleCount((c) => c + 10);
				}
			},
			{ rootMargin: "200px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [filteredAndSorted]);

	const visibleVeterans = filteredAndSorted.slice(0, visibleCount);

	const handleUpload = (file: File) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const raw = JSON.parse(e.target?.result as string);
				const parsed = VeteranUploadSchema.parse(raw);
				upsertVeterans(parsed);
				toast.success(
					`Loaded ${parsed.length} veteran${parsed.length !== 1 ? "s" : ""}`,
				);
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Invalid JSON format";
				toast.error(`Upload failed: ${message.slice(0, 120)}`);
			}
		};
		reader.readAsText(file);
	};

	const handleCancelCompare = () => {
		clearCompare();
		setCompareMode(false);
	};

	return (
		<Container className="py-6 flex flex-col gap-4">
			<h2 className="text-xl font-semibold">List of Veterans</h2>

			{veterans.length === 0 ? (
				<EmptyState onUpload={handleUpload} />
			) : (
				<>
					<UploadCard onUpload={handleUpload} />
					<FilterBar />

					<p className="text-sm text-muted-foreground">
						{filteredAndSorted.length} of {veterans.length} veterans
					</p>

					<div className="flex flex-col gap-3">
						{visibleVeterans.map((veteran, index) => (
							<VeteranCard
								key={veteran.id}
								veteran={veteran}
								appliedTags={tags[veteran.id] ?? []}
								isCompareMode={isCompareMode}
								isSelected={compareSelection.includes(veteran.id)}
								canSelect={compareSelection.length < 2}
								isAboveTheFold={index < 2}
							/>
						))}
					</div>
					{visibleCount < filteredAndSorted.length && (
						<div ref={sentinelRef} className="h-1" aria-hidden />
					)}
				</>
			)}

			{isCompareMode && (
				<CompareFloatingBar
					selectedIds={compareSelection}
					onCancel={handleCancelCompare}
				/>
			)}

			<ScrollToTopButton />
		</Container>
	);
}
