import Link from "next/dist/client/link";
import SocialBlock from "@/components/layout/SocialBlock"

export default function NewFooter() {

    return (
        <footer className="w-full mx-auto max-w-280 py-2 md:pt-6">

            {/* Top */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

                {/* Brand */}
                <div className="lg:col-span-5">
                    <Link
                        href="/"
                        prefetch={false}
                        className="inline-flex items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-sm font-bold tracking-widest text-white">
                            7F
                        </div>

                        <div>
                            <div className="text-base font-semibold tracking-tight text-white sm:text-lg">
                                7 Forge News
                            </div>

                            <div className="text-xs text-white/60 sm:text-sm">
                                Modern digital media by 7 Forge Inc.
                            </div>
                        </div>
                    </Link>

                    <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
                        Breaking stories, technology, culture, entertainment, and
                        internet trends — delivered with a clean modern editorial style.
                    </p>

                    {/* Social */}
                    <div className="mt-6 flex flex-wrap items-center gap-1">
                        <SocialBlock mode="light" />
                    </div>
                </div>

                {/* Links */}
                <div className="hidden md:grid gap-8 md:grid-cols-3 lg:col-span-7">

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                            Navigation
                        </h3>

                        <ul className="mt-4 space-y-3">
                            {[
                                "Home",
                                "Latest",
                                "Trending",
                                "World",
                                "Technology",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-white/60 transition hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                            Company
                        </h3>

                        <ul className="mt-4 space-y-3">
                            {[
                                "About",
                                "Contact",
                                "Careers",
                                "Advertise",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-white/60 transition hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                            Legal
                        </h3>

                        <ul className="mt-4 space-y-3">
                            {[
                                "Privacy Policy",
                                "Terms",
                                "DMCA",
                                "Cookies",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-white/60 transition hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-2 flex flex-col items-center gap-4 border-t border-white/10 pt-4 md:flex-row  md:justify-between">

                <p className="text-xs leading-6 text-white/60 md:text-sm ">
                    © {new Date().getFullYear()} 7 Forge Inc. All rights reserved.
                </p>

                <div className="hidden md:flex md:flex-wrap items-center gap-x-5 gap-y-2">
                    {[
                        "Editorial Policy",
                        "Accessibility",
                        "Sitemap",
                    ].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-xs text-white/60 transition hover:text-white/80 sm:text-sm"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}