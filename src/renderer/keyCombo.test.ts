'use strict';

import { toModifierSymbols, formatLabel } from './keyCombo';

describe('keyCombo', () => {
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

  describe(formatLabel.name, () => {
    it('returns the correct label as a string', () => {
      expect(
        formatLabel({
          key: 'C',
          altKey: true,
          ctrlKey: false,
          metaKey: true,
          shiftKey: true,
        })
      ).toEqual('⇧⌥⌘C');
    });

    it('returns an empty string when `key` is an empty string', () => {
      expect(
        formatLabel({
          key: '',
          altKey: true,
          ctrlKey: false,
          metaKey: true,
          shiftKey: true,
        })
      ).toBe('');
    });
  });
});
