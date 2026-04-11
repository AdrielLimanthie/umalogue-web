"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
	onUpload: (file: File) => void;
	label?: string;
	variant?: "default" | "outline" | "secondary";
};

export function UploadButton({
	onUpload,
	label = "Upload JSON",
	variant = "default",
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<input
				ref={inputRef}
				type="file"
				accept=".json,application/json"
				className="sr-only"
				aria-label="Upload veteran JSON file"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) {
						onUpload(file);
						// Reset so the same file can be re-uploaded
						e.target.value = "";
					}
				}}
			/>
			<Button variant={variant} onClick={() => inputRef.current?.click()}>
				<Upload className="h-4 w-4" />
				{label}
			</Button>
		</>
	);
}
