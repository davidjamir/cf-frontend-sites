import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidPostPath } from "@/helpers/validatorPostPath";

const EXACT_PATHS = new Set([
  "/",
  "/manifest.webmanifest",
  "/network",
  "/search",
  "/api/test",
]);

const PREFIX_PATHS = [
  "/_next/",
  "/images/",
  "/fonts/",
  "/category/",
  "/page/",
  "/post/",
  "/tag/",
  "/network/",
];

function isAllowedPath(path: string) {
  if (EXACT_PATHS.has(path)) return true;

  if (path.startsWith("/post/")) {
    return isValidPostPath(path);
  }

  if (PREFIX_PATHS.some((prefix) => path.startsWith(prefix))) {
    return true;
  }

  return false;
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.endsWith(".vercel.app")) {
    return NextResponse.json(
      { error: "Forbidden" },
      {
        status: 403,
        headers: {
          "Cache-Control":
            "public, max-age=31536000, s-maxage=31536000, immutable",
        },
      },
    );
  }

  if (!isAllowedPath(request.nextUrl.pathname)) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  }

  return NextResponse.next();
}
