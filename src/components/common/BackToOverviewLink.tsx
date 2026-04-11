import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackToOverviewLink() {
	return (
		<Link
			href="/"
			className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
		>
			<ArrowLeft className="h-4 w-4" />
			Back to overview
		</Link>
	);
}
