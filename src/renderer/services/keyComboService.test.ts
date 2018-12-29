'use strict';

import { TKeyCombo, keyComboToLabel } from './keyComboService';

/*
TODO: handle
  1) numbers
  2) key length > 1
  3) "" key
*/
describe('keyComboToLabel', () => {
  function labelOf({
    key,
    altKey = false,
    ctrlKey = false,
    metaKey = false,
    shiftKey = false,
  }: Partial<TKeyCombo>): string {
    return keyComboToLabel({ key, altKey, ctrlKey, metaKey, shiftKey });
  }

  it('returns an uppercase label for an alphabet', () => {
    expect(labelOf({ key: 'B' })).toBe('B');
    expect(labelOf({ key: 'p' })).toBe('P');
  });

  it('returns a combo label when one modifier key exists', () => {
    expect(labelOf({ key: 'P', shiftKey: true })).toBe('⇧P');
    expect(labelOf({ key: 'q', metaKey: true })).toBe('⌘Q');
    expect(labelOf({ key: 'r', altKey: true })).toBe('⌥R');
    expect(labelOf({ key: 's', ctrlKey: true })).toBe('⌃S');
  });

  // it('returns a combo label when multiple modifier keys exist');
  // it('returns the same order of modifier keys');
});
