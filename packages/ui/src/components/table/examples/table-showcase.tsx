import { StatusIndicator } from "@passui/react"
import { Button } from "@passui/react/button"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/react/profile-image"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@passui/react/table"

const members = [
    {
        name: "Aiko Kamado",
        email: "aiko@example.com",
        initials: "AK",
        src: "/avatars/aiko.svg",
        role: "Owner",
        online: true,
    },
    {
        name: "Kenji Mori",
        email: "kenji@example.com",
        initials: "KM",
        src: "/avatars/kenji.svg",
        role: "Admin",
        online: false,
    },
    {
        name: "Mira Patel",
        email: "mira@example.com",
        initials: "MP",
        src: "/avatars/mira.svg",
        role: "Member",
        online: true,
    },
]

export function TableShowcase() {
    return (
        <div className="w-full max-w-xl rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableCaption>3 members</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            <span className="sr-only">
                                Actions
                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.email}>
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
                                    <div className="flex flex-col">
                                        <span className="text-subheadline font-medium text-label">
                                            {member.name}
                                        </span>
                                        <span className="text-caption text-label-secondary">
                                            {member.email}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                {member.role}
                            </TableCell>
                            <TableCell>
                                <StatusIndicator
                                    state={
                                        member.online
                                            ? "saved"
                                            : "offline"
                                    }
                                >
                                    {member.online
                                        ? "Online"
                                        : "Away"}
                                </StatusIndicator>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                >
                                    Manage
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
