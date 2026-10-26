import { Button } from "@passui/solid/button"

export function ButtonLink() {
    return (
        <Button
            variant="link"
            onClick={() =>
                document
                    .getElementById("examples")
                    ?.scrollIntoView({ behavior: "smooth" })
            }
        >
            Explore examples <span aria-hidden="true">↗</span>
        </Button>
    )
}
