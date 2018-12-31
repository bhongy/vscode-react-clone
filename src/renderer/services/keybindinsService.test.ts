'use strict';

import { KeybindingsService } from './keybindingsService';

describe('KeybindingsService', () => {
  let keybindingsService: KeybindingsService;

  beforeEach(() => {
    const resolvedKeybindings = {
      quickOpen: {
        key: 'p',
        altKey: false,
        ctrlKey: false,
        metaKey: true,
        shiftKey: false,
      },
      quickCommands: {
        key: 'P',
        altKey: false,
        ctrlKey: false,
        metaKey: true,
        shiftKey: true,
      },
    };
    keybindingsService = new KeybindingsService(resolvedKeybindings);
  });

  it('returns the keybinding for the command id', () => {
    const keybinding = keybindingsService.findByCommandId('quickCommands');
    expect(keybinding).toEqual({ label: '⇧⌘P' });
  });

  it('returns `undefined` if the keybinding for the command id is not found', () => {
    const keybinding = keybindingsService.findByCommandId('doesNotExist');
    expect(keybinding).toBeUndefined();
  });
});
