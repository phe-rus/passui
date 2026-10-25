import { buttonStyle } from "@passui/react/button"
import { Link } from "@tanstack/react-router"

export function ClosingCta() {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="flex flex-col items-center gap-5 rounded-5xl bg-accent-soft px-6 py-16 text-center transition-colors duration-700 md:py-24">
                <h2 className="max-w-xl text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-bold tracking-tight text-label">
                    Discover everything{" "}
                    <span className="font-display font-black tracking-[-0.05em] text-accent-text transition-colors duration-700">
                        passui
                    </span>{" "}
                    can do
                </h2>
                <p className="max-w-md text-body text-label-secondary">
                    Browse the components, try every option
                    live, and tune the look to your brand.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/components/$slug"
                        params={{ slug: "button" }}
                        className={buttonStyle({
                            size: "lg",
                        })}
                    >
                        Get started
                    </Link>
                    <Link
                        to="/"
                        hash="components"
                        className={buttonStyle({
                            size: "lg",
                            variant: "secondary",
                        })}
                    >
                        Browse components
                    </Link>
                </div>
            </div>
        </section>
    )
}
