export function sanitizeInput(value: string): string {
  if (typeof value !== 'string') return value;
  return value.replace(/<\/?[^>]+(>|$)/g, '');
}
