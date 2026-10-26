import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

export function ProfileImageFallbacks() {
    return (
        <div class="flex items-center gap-4">
            <ProfileImage class="size-11">
                <ProfileImageContent src="/avatars/kenji.svg" />
                <ProfileImageFallback>
                    KM
                </ProfileImageFallback>
            </ProfileImage>
            <ProfileImage class="size-11">
                <ProfileImageContent src="/avatars/missing.png" />
                <ProfileImageFallback>
                    MP
                </ProfileImageFallback>
            </ProfileImage>
            <ProfileImage class="size-11">
                <ProfileImageFallback>
                    JS
                </ProfileImageFallback>
            </ProfileImage>
        </div>
    )
}
