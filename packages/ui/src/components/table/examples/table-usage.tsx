import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/react/profile-image"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@passui/react/table"

const members = [
    {
        name: "Aiko Kamado",
        initials: "AK",
        src: "/avatars/aiko.svg",
        role: "Owner",
    },
    {
        name: "Kenji Mori",
        initials: "KM",
        src: "/avatars/kenji.svg",
        role: "Admin",
    },
]

export function TableUsage() {
    return (
        <div className="w-full max-w-md rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.name}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <ProfileImage className="size-8">
                                        <ProfileImageContent
                                            src={member.src}
                                        />
                                        <ProfileImageFallback>
                                            {member.initials}
                                        </ProfileImageFallback>
                                    </ProfileImage>
                                    <span className="text-subheadline font-medium text-label">
                                        {member.name}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                {member.role}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
