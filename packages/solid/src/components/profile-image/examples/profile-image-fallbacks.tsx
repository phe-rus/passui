import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

export function ProfileImageFallbacks() {
    return (
        <div class="flex items-center gap-3">
            <ProfileImage>
                <ProfileImageContent
                    src="/missing-photo.jpg"
                    alt="Nora"
                />
                <ProfileImageFallback>
                    NO
                </ProfileImageFallback>
            </ProfileImage>
            <ProfileImage>
                <ProfileImageFallback>
                    AK
                </ProfileImageFallback>
            </ProfileImage>
            <ProfileImage>
                <ProfileImageFallback>
                    JD
                </ProfileImageFallback>
            </ProfileImage>
        </div>
    )
}
