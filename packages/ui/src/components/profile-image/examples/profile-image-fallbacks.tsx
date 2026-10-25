import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/react/profile-image"

export function ProfileImageFallbacks() {
    return (
        <div className="flex items-center gap-4">
            <ProfileImage className="size-11">
                <ProfileImageContent src="/avatars/kenji.svg" />
                <ProfileImageFallback>
                    KM
                </ProfileImageFallback>
            </ProfileImage>
            <ProfileImage className="size-11">
                <ProfileImageContent src="/avatars/missing.png" />
                <ProfileImageFallback>
                    MP
                </ProfileImageFallback>
            </ProfileImage>
            <ProfileImage className="size-11">
                <ProfileImageFallback>
                    JS
                </ProfileImageFallback>
            </ProfileImage>
        </div>
    )
}
