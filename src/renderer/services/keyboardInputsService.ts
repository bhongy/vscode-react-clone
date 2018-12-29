'use strict';

/**
 * This is an I/O boundary. Avoid logic.
 *
 * This should really be decoupled from keybindingsService.
 * For example, when letting users customize keybindings:
 *   the keybindingsService will be re-created
 *   but the keyboardInputService should not be a part of it.
 */

import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

// https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
const fromUserAction = (e: KeyboardEvent): boolean => e.isTrusted;
const keyboardEvent$ = fromEvent(document, 'keydown').pipe(filter(fromUserAction));

const isAlphabet = (key: string): boolean => /^[a-z]$/i.test(key);
// TODO: how to unit test this?
export const alphabetKeyboardEvent$ = keyboardEvent$.pipe(filter(isAlphabet));
