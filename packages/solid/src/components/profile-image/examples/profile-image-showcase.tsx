import { Button } from "@passui/solid/button"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

export function ProfileImageShowcase() {
    return (
        <div class="flex w-full max-w-xs flex-col items-center gap-4 rounded-4xl bg-elevated p-6 text-center shadow-sm ring-1 ring-separator/60">
            <ProfileImage class="size-20 text-title3">
                <ProfileImageContent src="/avatars/aiko.svg" />
                <ProfileImageFallback>
                    AK
                </ProfileImageFallback>
            </ProfileImage>
            <div class="flex flex-col gap-0.5">
                <h2 class="text-headline font-semibold text-label">
                    Aiko Kamado
                </h2>
                <p class="text-footnote text-label-secondary">
                    aiko@example.com
                </p>
            </div>
            <Button variant="secondary" size="sm">
                Change photo
            </Button>
        </div>
    )
}
