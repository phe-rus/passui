import { For } from "solid-js"
import { StatusIndicator } from "@passui/solid/status-indicator"
import { Button } from "@passui/solid/button"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@passui/solid/table"

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
        <div class="w-full max-w-xl rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableCaption>3 members</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            <span class="sr-only">
                                Actions
                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <For each={members}>
                        {(member) => (
                            <TableRow>
                                <TableCell>
                                    <div class="flex items-center gap-3">
                                        <ProfileImage class="size-8">
                                            <ProfileImageContent
                                                src={
                                                    member.src
                                                }
                                            />
                                            <ProfileImageFallback>
                                                {
                                                    member.initials
                                                }
                                            </ProfileImageFallback>
                                        </ProfileImage>
                                        <div class="flex flex-col">
                                            <span class="text-subheadline font-medium text-label">
                                                {member.name}
                                            </span>
                                            <span class="text-caption text-label-secondary">
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
                                <TableCell class="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                    >
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
            </Table>
        </div>
    )
}
