/** @jsxImportSource solid-js */
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

export function ProfileImageUsage() {
    return (
        <ProfileImage>
            <ProfileImageContent alt="Aiko Kamado" />
            <ProfileImageFallback>AK</ProfileImageFallback>
        </ProfileImage>
    )
}
