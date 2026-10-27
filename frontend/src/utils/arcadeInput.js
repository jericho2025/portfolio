const shifted = { '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')', '-': '_', '=': '+', '[': '{', ']': '}', ';': ':', "'": '"', ',': '<', '.': '>', '/': '?', '\\': '|', '`': '~' };
export function characterForKey(key, shift) {
  if (key === 'Space') return ' ';
  if (key.length !== 1) return null;
  return shift ? shifted[key] ?? key.toUpperCase() : key.toLowerCase();
}
export function virtualEdit(value, key, start, end, maxLength) {
  start = Math.max(0, Math.min(value.length, start)); end = Math.max(start, Math.min(value.length, end));
  if (key === 'Backspace') {
    if (start === end) start = Math.max(0, start - 1);
    return { value: value.slice(0, start) + value.slice(end), caret: start };
  }
  const insert = key.slice(0, Math.max(0, maxLength - value.length + end - start));
  return { value: value.slice(0, start) + insert + value.slice(end), caret: start + insert.length };
}
