'use strict';

import { toModifierSymbols } from './keyCombo';

describe(toModifierSymbols.name, () => {
  it('returns an array of key modifier symbols', () => {
    expect(toModifierSymbols({ altKey: true })).toEqual(['⌥']);
    expect(
      toModifierSymbols({
        key: 'R',
        altKey: false,
        ctrlKey: true,
        metaKey: true,
        shiftKey: true,
      })
    ).toEqual(expect.arrayContaining(['⌃', '⌘', '⇧']));
  });

  it('returns the correct order of key modifier symbols', () => {
    expect(
      toModifierSymbols({
        altKey: true,
        ctrlKey: true,
        metaKey: true,
        shiftKey: true,
      })
    ).toEqual(['⌃', '⇧', '⌥', '⌘']);
  });

  it('ignores non-modifier properties', () => {
    expect(toModifierSymbols({ key: 'p' })).toEqual([]);
  });
});
