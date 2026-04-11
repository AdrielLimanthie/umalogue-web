import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

export function ButtonLink({
	href,
	variant,
	size,
	className,
	children,
	...props
}: Props) {
	return (
		<Link
			href={href}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{children}
		</Link>
	);
}
