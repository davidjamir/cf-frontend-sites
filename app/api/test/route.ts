import { decryptPacket } from "@/lib/decrypt";
import { isCrypto, AES_SECRET_KEY } from "@/lib/env";
import { ORIGIN_CONFIG_DEVELOPMENT_DEFAULT } from "@/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const config = ORIGIN_CONFIG_DEVELOPMENT_DEFAULT();
    const response = await fetch(`${config.url}/api/site?host=${config.host}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from Worker" },
        { status: response.status },
      );
    }

    const encryptedData: string = await response.text();

    const result = await decryptPacket<unknown>(encryptedData, AES_SECRET_KEY);

    return NextResponse.json(result ?? { message: "No data returned" }, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
