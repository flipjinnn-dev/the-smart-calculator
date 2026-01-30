export function createUsernameSlug(username: string): string {
  return username
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export function normalizeUsername(usernameOrSlug: string): string {
  const decoded = decodeURIComponent(usernameOrSlug);
  return decoded
    .toLowerCase()
    .trim()
    .replace(/[-_]/g, ' ');
}
