import Image from "next/image";

export function SkillIcon({ iconid, name }: { iconid: number; name: string }) {
	return (
		<div className="relative shrink-0 w-8 h-8 rounded bg-muted overflow-hidden">
			<Image
				src={`/images/skill-icon-${iconid}.png`}
				alt={name}
				fill
				className="object-cover"
				sizes="32px"
				onError={() => {}}
			/>
		</div>
	);
}
