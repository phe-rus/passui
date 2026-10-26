import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

export function ProfileImageUsage() {
    return (
        <ProfileImage class="size-11">
            <ProfileImageContent src="/avatars/aiko.svg" />
            <ProfileImageFallback>AK</ProfileImageFallback>
        </ProfileImage>
    )
}
