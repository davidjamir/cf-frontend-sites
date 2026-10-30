export function isValidPostParams(
  segment: string,
  year: string,
  month: string,
  slug: string,
): boolean {
  // Part: p + number
  if (!/^p\d{1,3}$/.test(segment)) {
    return false;
  }

  // Year: 2026 - 2045
  const yearNumber = Number(year);

  if (!/^\d{4}$/.test(year) || yearNumber < 2026 || yearNumber > 2045) {
    return false;
  }

  // Month: 01 - 12
  const monthNumber = Number(month);

  if (!/^\d{2}$/.test(month) || monthNumber < 1 || monthNumber > 12) {
    return false;
  }

  // Slug: Base62 characters + hyphen + underscore, minimum 20 characters
  if (!/^[0-9a-zA-Z_-]{20,}$/.test(slug)) {
    return false;
  }

  return true;
}

export function isValidPostPath(path: string) {
  const segments = path.split("/");

  if (segments.length !== 6 || segments[1] !== "post") {
    return false;
  }

  const [, , segment, year, month, slug] = segments;

  return isValidPostParams(segment, year, month, slug);
}
