'use strict';

import { KeybindingsService } from './keybindingsService';
import {
  QuickOpenAction,
  ShowAllCommandsAction,
} from '@code/commands/workbenchCommands';

describe('KeybindingsService', () => {
  const resolvedKeybindings = {
    [QuickOpenAction.id]: {
      key: 'p',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: false,
    },
    [ShowAllCommandsAction.id]: {
      key: 'P',
      altKey: false,
      ctrlKey: false,
      metaKey: true,
      shiftKey: true,
    },
  };

  let service: KeybindingsService;
  beforeEach(() => {
    service = new KeybindingsService(resolvedKeybindings);
  });

  describe('findByCommandId', () => {
    it('returns the keybinding for the command id', () => {
      expect(service.findByCommandId(QuickOpenAction.id)).toEqual({
        label: '⌘P',
      });
      expect(service.findByCommandId(ShowAllCommandsAction.id)).toEqual({
        label: '⇧⌘P',
      });
    });

    it('returns `undefined` if the keybinding for the command id is not found', () => {
      service = new KeybindingsService({
        [QuickOpenAction.id]: undefined,
      });

      expect(service.findByCommandId(QuickOpenAction.id)).toBeUndefined();
      expect(service.findByCommandId(ShowAllCommandsAction.id)).toBeUndefined();
    });
  });

  describe('findByKeyCombo', () => {
    it('returns the associated command id for the key combo', () => {
      expect(
        service.findByKeyCombo({
          key: 'p',
          altKey: false,
          ctrlKey: false,
          metaKey: true,
          shiftKey: false,
        })
      ).toEqual(QuickOpenAction.id);

      expect(
        service.findByKeyCombo({
          key: 'P',
          altKey: false,
          ctrlKey: false,
          metaKey: true,
          shiftKey: true,
        })
      ).toEqual(ShowAllCommandsAction.id);
    });

    it('returns `undefined` if the key combo is not used for any command', () => {
      expect(
        service.findByKeyCombo({
          key: 'z',
          altKey: false,
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
        })
      ).toBeUndefined();
    });
  });
});
