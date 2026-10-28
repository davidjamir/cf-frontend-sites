function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");

  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(padded);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

export async function decryptPacket<T = unknown>(
  encryptedData: string,
  secretKey: string,
): Promise<T> {
  const keyBytes = fromBase64Key(secretKey);

  if (keyBytes.length !== 32) {
    throw new Error("Invalid AES-256 key");
  }

  const packet = fromBase64Url(encryptedData);

  if (packet.length < 12 + 16) {
    throw new Error("Invalid encrypted payload");
  }

  const iv = packet.slice(0, 12);
  const ciphertext = packet.slice(12);

  const key = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, [
    "decrypt",
  ]);

  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
      tagLength: 128,
    },
    key,
    ciphertext,
  );

  const decoded = new TextDecoder().decode(plaintext);

  return JSON.parse(decoded) as T;
}

function fromBase64Key(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}
