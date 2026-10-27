import { characterForKey } from '../../utils/arcadeInput.js';
const rows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ['-', '=', '[', ']', ';', "'", ',', '.', '/'],
  ['Shift', 'Space', 'Backspace'],
];

export default function TypingKeyboard({ pressed, shift, onShift, onKey, disabled }) {
  return <div className="typing-keyboard" role="group" aria-label="On-screen typing keyboard">
    {rows.map((row, index) => <div className="keyboard-row" key={index}>{row.map(key => {
      const character = characterForKey(key, shift), label = key.length > 1 ? key : character;
      return <button type="button" key={key} disabled={disabled} aria-label={label} aria-pressed={key === 'Shift' ? shift : undefined} className={`${key.length > 1 ? 'wide-key' : ''} ${key === 'Space' ? 'space-key' : ''} ${pressed === key.toLowerCase() || pressed === character?.toLowerCase() ? 'pressed-key' : ''}`} onPointerDown={e => e.preventDefault()} onClick={() => key === 'Shift' ? onShift() : onKey(key === 'Backspace' ? key : character, key)}>{key === 'Backspace' ? '⌫' : key === 'Space' ? 'Space' : label}</button>;
    })}</div>)}
  </div>;
}
