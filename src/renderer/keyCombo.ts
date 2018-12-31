'use strict';

export interface TKeyCombo {
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

const orderedModifierSymbolKeys: Array<keyof TModifierSymbol> = [
  'ctrlKey',
  'shiftKey',
  'altKey',
  'metaKey',
];

// keyToSymbol
function toModifierSymbol<K extends keyof TModifierSymbol>(
  modifierKey: K
): TModifierSymbol[K] {
  return modifierKeyToSymbol[modifierKey];
}

// keyComboToSymbols
export function toModifierSymbols(keyCombo: Partial<TKeyCombo>) {
  return orderedModifierSymbolKeys
    .filter(k => keyCombo[k])
    .map(toModifierSymbol);
}

export function formatLabel(keyCombo: TKeyCombo): string {
  if (keyCombo.key === '') {
    return '';
  }
  const { key, ...modifierProps } = keyCombo;
  const modifiers = toModifierSymbols(modifierProps);
  return modifiers.join('') + key.toUpperCase();
}
