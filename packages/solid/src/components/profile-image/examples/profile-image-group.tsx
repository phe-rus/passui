import { For } from "solid-js"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

const people = [
    { initials: "AK", src: "/avatars/aiko.svg" },
    { initials: "KM", src: "/avatars/kenji.svg" },
    { initials: "MP", src: "/avatars/mira.svg" },
]

export function ProfileImageGroup() {
    return (
        <div class="flex items-center">
            <For each={people}>
                {(person) => (
                    <ProfileImage class="-ms-2 size-9 ring-2 ring-background first:ms-0">
                        <ProfileImageContent
                            src={person.src}
                        />
                        <ProfileImageFallback>
                            {person.initials}
                        </ProfileImageFallback>
                    </ProfileImage>
                )}
            </For>
            <ProfileImage class="-ms-2 size-9 ring-2 ring-background">
                <ProfileImageFallback>
                    +4
                </ProfileImageFallback>
            </ProfileImage>
        </div>
    )
}
