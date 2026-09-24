import { ImageResponse } from "next/og";
import { siteService } from "@/services/site.service";

export const size = {
    width: 180,
    height: 180,
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
                    objectFit: "cover",
                }}
            />,

        </div>
        ),
        size
    )
}
