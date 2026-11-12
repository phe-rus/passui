import { IconButton } from "@passui/react/icon-button";
import { Button } from "@passui/react/legacy/button";
import { Popover } from "@passui/react/legacy/popover";
import {
	ProfileImage,
	ProfileImageContent,
	ProfileImageFallback,
} from "@passui/react/profile-image";

export function PopoverShowcase() {
	return (
		<div className="flex h-80 w-full max-w-sm items-start justify-end">
			<Popover defaultOpen>
				<Popover.Trigger
					render={(props) => (
						<IconButton
							{...props}
							type="button"
							label="Account"
							variant="ghost"
						>
							<ProfileImage className="size-11">
								<ProfileImageContent src="/avatars/aiko.svg" />
								<ProfileImageFallback>AK</ProfileImageFallback>
							</ProfileImage>
						</IconButton>
					)}
				/>
				<Popover.Content
					origin="top-right"
					label="Account"
					className="flex w-64 flex-col items-center gap-3 p-5 text-center"
				>
					<ProfileImage className="text-title3 size-16">
						<ProfileImageContent src="/avatars/aiko.svg" />
						<ProfileImageFallback>AK</ProfileImageFallback>
					</ProfileImage>
					<div className="flex flex-col">
						<span className="text-headline text-label font-semibold">
							Aiko Kamado
						</span>
						<span className="text-footnote text-label-secondary">
							aiko@example.com
						</span>
					</div>
					<Button variant="secondary" size="sm">
						Manage your account
					</Button>
				</Popover.Content>
			</Popover>
		</div>
	);
}
