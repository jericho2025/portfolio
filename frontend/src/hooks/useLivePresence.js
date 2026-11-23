import { useEffect, useState } from 'react';
import { apiUrl } from '../utils/apiUrl.js';

const PERIOD_MS = 20_000;
const SESSION_KEY = 'portfolio-presence-session';

// Browser-session identifier only: no account, IP, fingerprint, or analytics cookie.
function getSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing && /^[a-f0-9-]{36}$/i.test(existing)) return existing;
    const created = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    return globalThis.crypto?.randomUUID?.() || null;
  }
}

export function useLivePresence() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const id = getSessionId();
    if (!id) return undefined;
    let mounted = true;
    let inFlight = false;

    async function heartbeat() {
      if (!mounted || inFlight || document.visibilityState !== 'visible') return;
      inFlight = true;
      try {
        const url = apiUrl('/api/presence', import.meta.env.VITE_API_BASE_URL || '', import.meta.env.PROD);
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'omit',
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error('Presence unavailable');
        const data = await response.json();
        if (mounted) setCount(data.status === 'ok' && Number.isSafeInteger(data.count) && data.count >= 1 ? data.count : null);
      } catch {
        if (mounted) setCount(null);
      } finally {
        inFlight = false;
      }
    }

    heartbeat();
    const interval = setInterval(heartbeat, PERIOD_MS);
    document.addEventListener('visibilitychange', heartbeat);
    return () => {
      mounted = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', heartbeat);
    };
  }, []);

  return count;
}
