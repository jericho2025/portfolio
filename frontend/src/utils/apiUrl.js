export function apiUrl(path, base = '', production = false) {
  base = base.trim().replace(/\/$/, '');
  if (!base && !production) return path;
  if (!base) throw new Error('The portfolio API URL has not been configured. You can still visit my GitHub profile directly.');
  const url = new URL(base);
  const loopback = /(^|\.)localhost\.?$/i.test(url.hostname) || /^127\./.test(url.hostname) || ['0.0.0.0', '[::1]', '[::]'].includes(url.hostname);
  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== base || url.username || url.password || (production && (url.protocol !== 'https:' || loopback))) {
    throw new Error('The portfolio API URL is invalid. You can still visit my GitHub profile directly.');
  }
  return base + path;
}
