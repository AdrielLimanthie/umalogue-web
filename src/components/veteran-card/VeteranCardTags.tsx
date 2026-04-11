import { PillCloseButton } from "@/components/common/PillCloseButton";
import { Badge } from "@/components/ui/badge";
import { AddTagPopover } from "@/components/veteran-card/AddTagPopover";

type Props = {
	appliedTags: string[];
	onAddTag: (tag: string) => void;
	onRemoveTag: (tag: string) => void;
};

export function VeteranCardTags({ appliedTags, onAddTag, onRemoveTag }: Props) {
	return (
		<div className="flex flex-col gap-1">
			<span className="text-sm text-muted-foreground">Tags</span>
			<div className="flex flex-wrap items-center gap-1 min-h-8">
				{appliedTags.map((tag) => (
					<Badge
						key={tag}
						variant="secondary"
						className="flex items-center gap-1 pr-1 text-sm"
					>
						{tag}
						<PillCloseButton
							onClick={() => onRemoveTag(tag)}
							ariaLabel={`Remove tag "${tag}"`}
						/>
					</Badge>
				))}
				<AddTagPopover
					appliedTags={appliedTags}
					onAddTag={onAddTag}
					onRemoveTag={onRemoveTag}
				/>
			</div>
		</div>
	);
}
