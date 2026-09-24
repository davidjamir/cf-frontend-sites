import { ImageResponse } from "next/og";
import { siteService } from "@/services/site.service";

export const size = {
    width: 32,
    height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
    const site = await siteService.getCurrentSite();

    return new ImageResponse(
        (<div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <img
                src={site.icon}
                alt={site.name}
                width={size.width}
                height={size.height}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />,

        </div>
        ),
        size
    )
}
