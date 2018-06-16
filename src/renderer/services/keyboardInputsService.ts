/**
 * This is an I/O boundary. Avoid logic.
 */

import { fromEvent } from 'rxjs';

export const keyboardEvent$ = fromEvent<KeyboardEvent>(document, 'keydown');

// type TKeyCombo = { key, altKey, ctrlKey, metaKey, shiftKey }
// -- KeyCombo is probably the standard message that we'll pass around
// keyboardEventToKeyDescription :: KeyboardEvent -> KeyCombo
// keyComboToLabel :: KeyCombo -> Label `⌘P`

// Context (when, where) -> KeyCombo -> Command (data)
// e.g. we don't handle keybindings when setting keybindings
// or same KeyCombo result in different command where different part has focus
