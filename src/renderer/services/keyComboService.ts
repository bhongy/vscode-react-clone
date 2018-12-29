'use strict';

/**
 * KeyCombo is probably the standard message that we'll pass around
 *
 * TODO: refactor this whole module
 */

// Context (when, where) -> KeyCombo -> Command (data)
// e.g. we don't handle keybindings when setting keybindings
// or same KeyCombo result in different command where different part has focus

import { map } from 'rxjs/operators';
import { alphabetKeyboardEvent$ } from './keyboardInputsService';

export interface TKeyCombo {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export const keyComboEvent$ = alphabetKeyboardEvent$.pipe(
  map(
    (e: KeyboardEvent): TKeyCombo => ({
      key: e.key,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      shiftKey: e.shiftKey,
    })
  )
);

enum KeyModifierSymbol {
  altKey = '⌥',
  ctrlKey = '⌃',
  metaKey = '⌘',
  shiftKey = '⇧',
}

export function keyComboToLabel(keyCombo: TKeyCombo): string {
  const modifiers = Object.keys(KeyModifierSymbol).reduce((result, k) => {
    const v = KeyModifierSymbol[k];
    return keyCombo[k] ? result + v : result;
  }, '');
  return modifiers + keyCombo.key.toUpperCase();
}
