import { For } from "solid-js"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@passui/solid/table"

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
        <div class="w-full max-w-md rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Role</TableHead>
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
                                        <span class="text-subheadline font-medium text-label">
                                            {member.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {member.role}
                                </TableCell>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
            </Table>
        </div>
    )
}
