'use client'
import { useSite } from "@/hooks/use-site"

export default function NHLTheme({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const site = useSite();
    console.log("Test", site)

    return <div>{children}</div>;
}
