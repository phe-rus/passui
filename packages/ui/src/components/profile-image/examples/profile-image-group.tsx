import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/react/profile-image"

const people = [
    { initials: "AK", src: "/avatars/aiko.svg" },
    { initials: "KM", src: "/avatars/kenji.svg" },
    { initials: "MP", src: "/avatars/mira.svg" },
]

export function ProfileImageGroup() {
    return (
        <div className="flex items-center">
            {people.map((person) => (
                <ProfileImage
                    key={person.initials}
                    className="-ms-2 size-9 ring-2 ring-background first:ms-0"
                >
                    <ProfileImageContent src={person.src} />
                    <ProfileImageFallback>
                        {person.initials}
                    </ProfileImageFallback>
                </ProfileImage>
            ))}
            <ProfileImage className="-ms-2 size-9 ring-2 ring-background">
                <ProfileImageFallback>
                    +4
                </ProfileImageFallback>
            </ProfileImage>
        </div>
    )
}
