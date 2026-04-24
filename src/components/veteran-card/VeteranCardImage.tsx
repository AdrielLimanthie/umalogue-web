import { UmaImage } from "@/components/common/UmaImage";

type Props = {
	cardId: number;
	umaName: string;
	isAboveTheFold?: boolean;
};

export function VeteranCardImage({ cardId, umaName, isAboveTheFold }: Props) {
	return (
		<UmaImage
			cardId={cardId}
			umaName={umaName}
			sizes="6rem"
			className="shrink-0 w-24 h-24"
			loading={isAboveTheFold ? "eager" : "lazy"}
		/>
	);
}
