import { useEffect, useRef, useState } from 'react';

export default function useGameClock(running) {
  const [seconds, setSeconds] = useState(0);
  const accumulated = useRef(0), started = useRef(0);
  useEffect(() => {
    if (!running) return;
    started.current = performance.now();
    const id = setInterval(() => setSeconds((accumulated.current + performance.now() - started.current) / 1000), 100);
    return () => { accumulated.current += performance.now() - started.current; clearInterval(id); };
  }, [running]);
  return seconds;
}
