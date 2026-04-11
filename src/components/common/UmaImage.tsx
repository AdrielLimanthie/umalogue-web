import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
	cardId: number;
	umaName: string;
	sizes: string;
	className?: string;
	priority?: boolean;
	loading?: "eager" | "lazy";
};

export function UmaImage({
	cardId,
	umaName,
	sizes,
	className,
	priority,
	loading,
}: Props) {
	return (
		<div className={cn("relative bg-muted overflow-hidden", className)}>
			<Image
				src={`/images/uma-${cardId}.png`}
				alt={umaName}
				fill
				className="object-cover"
				sizes={sizes}
				onError={() => {}}
				priority={priority}
				loading={loading}
			/>
		</div>
	);
}
