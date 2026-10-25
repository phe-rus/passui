import { Button } from "@passui/react/button"
import { toast } from "@passui/react/toast"

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
        <div className="flex flex-wrap justify-center gap-2">
            <Button
                variant="secondary"
                onClick={() =>
                    toast.promise(upload(false), {
                        loading: "Uploading",
                        success: (name) => `${name} uploaded`,
                        error: "Upload failed",
                    })
                }
            >
                Upload
            </Button>
            <Button
                variant="secondary"
                onClick={() =>
                    toast.promise(upload(true), {
                        loading: "Uploading",
                        success: "Uploaded",
                        error: "Upload failed. Check your connection.",
                    })
                }
            >
                Upload while offline
            </Button>
        </div>
    )
}
