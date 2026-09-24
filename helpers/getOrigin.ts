export function getOrigin(domain: string) {
  return domain.split(".").slice(-2).join(".");
}
