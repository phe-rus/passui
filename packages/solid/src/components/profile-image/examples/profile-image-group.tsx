import { For } from "solid-js"
import {
    ProfileImage,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

export function ProfileImageGroup() {
    return (
        <div class="flex items-center gap-3">
            <div class="flex -space-x-2">
                <For each={["AK", "NO", "JD", "RM"]}>
                    {(initials) => (
                        <ProfileImage class="ring-2 ring-background">
                            <ProfileImageFallback>
                                {initials}
                            </ProfileImageFallback>
                        </ProfileImage>
                    )}
                </For>
            </div>
            <span class="text-footnote text-label-secondary">
                4 collaborators
            </span>
        </div>
    )
}
