"use client";
import Link from "next/link";
import { useSite } from "@/hooks/use-site";
import {
    FaDiscord,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaRedditAlien,
    FaTelegramPlane,
    FaTiktok,
    FaTwitch,
    FaWhatsapp,
    FaSnapchatGhost,
    FaYoutube,
    FaTwitter,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

type Props = {
    mode: "light" | "dark";
};

export const SOCIALS = {
    facebook: {
        title: "Facebook",
        baseUrl: "https://facebook.com/",
        icon: <FaFacebookF />,
    },
    instagram: {
        title: "Instagram",
        baseUrl: "https://instagram.com/",
        icon: <FaInstagram />,
    },
    threads: {
        title: "Threads",
        baseUrl: "https://threads.net/@",
        icon: <FaThreads />,
    },
    x: {
        title: "X",
        baseUrl: "https://x.com/",
        icon: <FaTwitter />,
    },
    tiktok: {
        title: "TikTok",
        baseUrl: "https://www.tiktok.com/@",
        icon: <FaTiktok />,
    },
    youtube: {
        title: "YouTube",
        baseUrl: "https://youtube.com/",
        icon: <FaYoutube />,
    },
    telegram: {
        title: "Telegram",
        baseUrl: "https://t.me/",
        icon: <FaTelegramPlane />,
    },
    reddit: {
        title: "Reddit",
        baseUrl: "https://reddit.com/",
        icon: <FaRedditAlien />,
    },
    pinterest: {
        title: "Pinterest",
        baseUrl: "https://pinterest.com/",
        icon: <FaPinterest />,
    },
    discord: {
        title: "Discord",
        baseUrl: "https://discord.gg/",
        icon: <FaDiscord />,
    },
    whatsapp: {
        title: "WhatsApp",
        baseUrl: "https://wa.me/",
        icon: <FaWhatsapp />,
    },
    snapchat: {
        title: "Snapchat",
        baseUrl: "https://snapchat.com/add/",
        icon: <FaSnapchatGhost />,
    },
    twitch: {
        title: "Twitch",
        baseUrl: "https://twitch.tv/",
        icon: <FaTwitch />,
    },
    linkedin: {
        title: "LinkedIn",
        baseUrl: "https://linkedin.com/in/",
        icon: <FaLinkedinIn />,
    },
};
export default function SocialBlock({ mode }: Props) {
    const { site } = useSite();
    const items = Object.entries(site.socials ?? {}).filter(
        ([, value]) => !!value,
    );
    const isDark = mode === "dark";

    return (
        <div className={`w-full ${items.length > 0 ? "flex flex-wrap gap-1 lg:gap-2" : ""}`}>
            {items.map(([key, value]) => {
                const social = SOCIALS[key as keyof typeof SOCIALS];
                if (!social) return null;

                const href =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : social.baseUrl + value;

                return (
                    <Link
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        prefetch={false}
                        className={`rounded-full border p-1 md:p-2 text-xs  transition  ${isDark ? "border-black/10 hover:border-black/25" : "border-white/10 hover:border-white/25"} `}
                    >
                        <Badge
                            className={`bg-transparent ${isDark
                                ? "text-black/70 hover:text-black"
                                : "text-white/85 hover:text-white"
                                }`}
                        >
                            {social.icon}
                            {social.title}
                        </Badge>
                    </Link>
                );
            })}
        </div>
    );
}
