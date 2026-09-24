export function getSegmentNumber(segment: string): number {
  const match = segment.match(/^[a-zA-Z](\d+)$/);

  if (!match) {
    throw new Error(`Invalid segment: ${segment}`);
  }

  return Number(match[1]);
}
