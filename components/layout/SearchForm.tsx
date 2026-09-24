"use client";

import { Search } from "lucide-react";
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupButton,
} from "@/components/ui/input-group";

export default function SearchForm({
    textColor = "black",
}: {
    textColor?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const previousPath = useRef(pathname);
    const [value, setValue] = useState("");

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        setValue(next);
        // clear search
        if (pathname.startsWith("/search") && !next.trim()) {
            router.push(previousPath.current);
        }
    };

    const onSubmit = () => {
        const q = value.trim();
        if (!q) return;
        // lưu route trước search
        if (!pathname.startsWith("/search")) {
            previousPath.current = pathname;
        }
        router.push(`/search?q=${encodeURIComponent(q)}`);
    };

    return (
        <div id="search-form" className="w-full max-w-xs">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <InputGroup
                    className="w-full lg:h-10 min-w-0 "
                    style={{
                        borderColor: `color-mix(in srgb, ${textColor} 40%, transparent)`,
                        color: textColor,
                    }}
                >
                    <InputGroupInput
                        placeholder="Search..."
                        value={value}
                        onChange={onChangeValue}
                    />

                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            type="submit"
                            variant="ghost"
                            className="ml-auto cursor-pointer text-white/70 hover:bg-white/5 hover:text-white"
                            aria-label="Search"
                            size="icon-sm"
                        >
                            <Search style={{ color: textColor }} />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </div>
    );
}
