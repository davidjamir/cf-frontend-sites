import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.endsWith(".vercel.app")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = request.nextUrl;

  // Nếu request có dính query cache nội bộ do Vinext tự đẻ ra, tiến hành xóa nó đi
  if (url.searchParams.has("__vinext_cache_key")) {
    url.searchParams.delete("__vinext_cache_key");

    // Rewrite lại URL sạch sẽ không còn query key đó nữa
    return NextResponse.rewrite(url, {
      request: {
        headers: request.headers,
      },
    });
  }

  return NextResponse.next();
}
