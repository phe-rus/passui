import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"
import { Button } from "@passui/solid/button"

function upload(fails: boolean) {
    return new Promise<string>((resolve, reject) =>
        setTimeout(
            () =>
                fails
                    ? reject(new Error("offline"))
                    : resolve("photo.jpg"),
            1600
        )
    )
}

export function ToastPromise() {
    return (
        <>
            <div class="flex flex-wrap justify-center gap-2">
                <Button
                    variant="secondary"
                    onClick={() => {
                        void toast.promise(upload(false), {
                            loading: "Uploading",
                            success: (name) =>
                                `${name} uploaded`,
                            error: "Upload failed",
                        })
                    }}
                >
                    Upload
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        void toast
                            .promise(upload(true), {
                                loading: "Uploading",
                                success: "Uploaded",
                                error: "Upload failed. Check your connection.",
                            })
                            .catch(() => {})
                    }}
                >
                    Upload while offline
                </Button>
            </div>
            <Toaster />
        </>
    )
}
