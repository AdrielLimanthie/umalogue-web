import { X } from "lucide-react";

type Props = {
	onClick: () => void;
	ariaLabel: string;
};

export function PillCloseButton({ onClick, ariaLabel }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={ariaLabel}
			className="hover:text-destructive transition-colors cursor-pointer"
		>
			<X className="h-4 w-4" />
		</button>
	);
}
