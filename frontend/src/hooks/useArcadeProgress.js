import { useRef, useState } from 'react';
import { applyResult, readProgress, STORAGE_KEY, validateProgress } from '../utils/arcadeStorage.js';

export default function useArcadeProgress() {
  const [initial] = useState(readProgress);
  const [progress, setProgress] = useState(initial.progress);
  const current = useRef(initial.progress);
  const [available, setAvailable] = useState(initial.available);
  function save(next) {
    current.current = next; setProgress(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setAvailable(true); }
    catch { setAvailable(false); }
  }
  return { progress, available, finish: result => save(applyResult(current.current, result)), reset: () => save(validateProgress(null)) };
}
