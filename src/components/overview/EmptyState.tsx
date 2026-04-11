import { UploadCloud } from "lucide-react";
import { UploadButton } from "@/components/overview/UploadButton";

type Props = {
	onUpload: (file: File) => void;
};

export function EmptyState({ onUpload }: Props) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
			<UploadCloud
				className="h-16 w-16 text-muted-foreground"
				aria-hidden="true"
			/>
			<div>
				<h2 className="text-lg font-semibold">No veteran data yet</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Upload your exported veterans JSON to get started. Use{" "}
					<a
						href="https://github.com/xancia/UmaExtractor"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-foreground"
					>
						UmaExtractor
					</a>{" "}
					to export your data from the game.
				</p>
			</div>
			<UploadButton onUpload={onUpload} />
		</div>
	);
}
