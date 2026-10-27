import test from 'node:test';
import assert from 'node:assert/strict';
import { virtualEdit, characterForKey } from '../src/utils/arcadeInput.js';

test('virtual keys cover case, numbers, spaces and shifted punctuation', () => {
  assert.equal(characterForKey('a', false), 'a'); assert.equal(characterForKey('a', true), 'A');
  assert.equal(characterForKey('1', true), '!'); assert.equal(characterForKey('.', true), '>');
  assert.equal(characterForKey('Space', false), ' '); assert.equal(characterForKey('Backspace', false), null);
});
test('one editor handles insertion, selection replacement and Backspace', () => {
  assert.deepEqual(virtualEdit('ab', 'c', 1, 1, 20), { value: 'acb', caret: 2 });
  assert.deepEqual(virtualEdit('abcd', 'x', 1, 3, 20), { value: 'axd', caret: 2 });
  assert.deepEqual(virtualEdit('ab', 'Backspace', 2, 2, 20), { value: 'a', caret: 1 });
  assert.deepEqual(virtualEdit('ab', 'Backspace', 0, 0, 20), { value: 'ab', caret: 0 });
  assert.deepEqual(virtualEdit('abcd', 'Backspace', 1, 3, 20), { value: 'ad', caret: 1 });
});
test('virtual input respects passage length and handles rapid sequential updates', () => {
  assert.deepEqual(virtualEdit('ab', 'c', 2, 2, 2), { value: 'ab', caret: 2 });
  let value = ''; for (const c of 'hello world.') value = virtualEdit(value, c, value.length, value.length, 20).value;
  assert.equal(value, 'hello world.');
});
