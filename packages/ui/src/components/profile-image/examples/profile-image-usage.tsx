import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/react/profile-image"

export function ProfileImageUsage() {
    return (
        <ProfileImage className="size-11">
            <ProfileImageContent src="/avatars/aiko.svg" />
            <ProfileImageFallback>AK</ProfileImageFallback>
        </ProfileImage>
    )
}
