"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<button
			type="button"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			aria-label="Back to top"
			className={cn(
				"fixed bottom-6 right-6 z-50 h-10 w-10 bg-primary text-primary-foreground border-2 border-foreground shadow-lg cursor-pointer flex items-center justify-center transition-all duration-200",
				visible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none",
			)}
		>
			<ArrowUp className="h-4 w-4" />
		</button>
	);
}
