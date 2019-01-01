'use strict';

import { KeybindingsService } from './keybindingsService';

describe('KeybindingsService', () => {
  enum COMMAND_ID {
    quickOpen = 'quickOpen',
    allCommands = 'allCommands',
  }

  const resolvedKeybindings = {
    [COMMAND_ID.quickOpen]: {
      key: 'p',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    },
    [COMMAND_ID.allCommands]: {
      key: 'P',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: true,
    },
  };

  const keybindingsService = new KeybindingsService(resolvedKeybindings);

  describe(keybindingsService.findByCommandId.name, () => {
    it('returns the keybinding for the command id', () => {
      expect(keybindingsService.findByCommandId(COMMAND_ID.quickOpen)).toEqual({
        label: '⌘P',
      });
      expect(
        keybindingsService.findByCommandId(COMMAND_ID.allCommands)
      ).toEqual({
        label: '⇧⌘P',
      });
    });

    it('returns `undefined` if the keybinding for the command id is not found', () => {
      const keybinding = keybindingsService.findByCommandId('doesNotExist');
      expect(keybinding).toBeUndefined();
    });
  });

  describe(keybindingsService.findByKeyCombo.name, () => {
    it('returns the associated command id for the key combo', () => {
      expect(
        keybindingsService.findByKeyCombo({
          key: 'p',
          altKey: false,
          ctrlKey: false,
          metaKey: true,
          shiftKey: false,
        })
      ).toEqual(COMMAND_ID.quickOpen);

      expect(
        keybindingsService.findByKeyCombo({
          key: 'P',
          altKey: false,
          ctrlKey: false,
          metaKey: true,
          shiftKey: true,
        })
      ).toEqual(COMMAND_ID.allCommands);
    });

    it('returns `undefined` if the key combo is not set for any command', () => {
      const keybinding = keybindingsService.findByKeyCombo({
        key: 'z',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      });
      expect(keybinding).toBeUndefined();
    });
  });
});
