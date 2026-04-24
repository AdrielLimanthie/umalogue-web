import { UploadButton } from "@/components/overview/UploadButton";

type Props = {
	onUpload: (file: File) => void;
};

export function UploadCard({ onUpload }: Props) {
	return (
		<div className="bg-card border-2 border-dashed border-border p-4 flex items-center justify-between gap-4 flex-wrap">
			<div>
				<p className="text-sm font-medium">Update veteran data</p>
				<p className="text-xs text-muted-foreground mt-0.5">
					Veterans are added & removed based on the uploaded data. Custom tags
					previously added to veterans will be preserved.
				</p>
			</div>
			<UploadButton
				onUpload={onUpload}
				label="Upload new JSON"
				variant="outline"
			/>
		</div>
	);
}
