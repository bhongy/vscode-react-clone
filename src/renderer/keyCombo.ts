'use strict';

interface TKeyCombo {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

/* Modifier - could extract to a separate module and/or class */

interface TModifierSymbol {
  readonly altKey: '⌥';
  readonly ctrlKey: '⌃';
  readonly metaKey: '⌘';
  readonly shiftKey: '⇧';
}

const modifierKeyToSymbol: TModifierSymbol = {
  altKey: '⌥',
  ctrlKey: '⌃',
  metaKey: '⌘',
  shiftKey: '⇧',
};

// keyToSymbol
function toModifierSymbol<K extends keyof TModifierSymbol>(
  modifierKey: K
): TModifierSymbol[K] {
  return modifierKeyToSymbol[modifierKey];
}

// keyComboToSymbols
export function toModifierSymbols(keyCombo: Partial<TKeyCombo>) {
  return Object.keys(modifierKeyToSymbol)
    // need to provide extra type info because typescript built-in lib.es5.d.ts
    // type Object.keys to always return `string[]` rather than infer T
    .filter((k: keyof TModifierSymbol) => keyCombo[k])
    .map(toModifierSymbol);
}
