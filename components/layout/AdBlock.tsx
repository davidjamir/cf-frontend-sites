"use client";

import { memo } from "react";

function AdBlock({ code }: { code: string }) {
    if (!code) return null;

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: code,
            }}
            className="w-full ads-block"
        />
    );
}

export default memo(AdBlock);
