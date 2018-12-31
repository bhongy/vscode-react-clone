'use strict';

/**
 * Keybinding Service returns a command (id) given a key combo.
 *   ? (not sure) multiple key combos can map to the same command (many:keyCombo -> one:command)
 *
 * Keep the service immutable. If the keybindings change, create a new service.
 *   Persistent data structures can be used if performance is a concern.
 *
 * The service is created by (its input is) a list of **all** keybindings (command to keyCombo)
 *   _resolved_ from all keybindings lists (default, extensions, user's, workspace).
 */

import { TKeyCombo, formatLabel } from '@/keyCombo';
import { TCommand } from '@/commands/main';
// TODO: create keybinding resolvers that takes default/user configs
// so we don't hardcode these into the keybinding service
import {
  QuickOpenAction,
  ShowAllCommandsAction,
} from '@/commands/workbenchCommands';

// interface TKeybindingsService {
//   findByCommandId(commandId: TCommand['id']): TKeybinding | undefined;
//   findByKeyCombo(keyCombo: TKeyCombo): TCommand | undefined;
// }

type TCommandToKeyCombo = { readonly [P in TCommand['id']]: TKeyCombo };

// look up by CommandId rather than Command
// because CommandId is the data that's being passed around the system
class CommandToKeyComboResolver {
  private readonly record: TCommandToKeyCombo;

  constructor(record: TCommandToKeyCombo) {
    this.record = record;
  }

  findByCommandId(commandId: TCommand['id']): TKeyCombo | undefined {
    return this.record[commandId];
  }
}

class KeyComboToCommandResolver {
  private readonly record: { [k: string]: TCommand['id'] };
  private static formatKey = formatLabel;

  constructor(record: TCommandToKeyCombo) {
    this.record = Object.entries(record).reduce(
      (prev, [commandId, keyCombo]) => {
        const key = KeyComboToCommandResolver.formatKey(keyCombo);
        return Object.assign(prev, { [key]: commandId });
      },
      {}
    );
  }

  findByKeyCombo(keyCombo: TKeyCombo): TCommand['id'] | undefined {
    const key = KeyComboToCommandResolver.formatKey(keyCombo);
    return this.record[key];
  }
}

interface TKeybinding {
  readonly label: string;
  // readonly source: 'default' | 'user';
}

// Support two-way lookup:
// - keyCombo -> commandId
// - commandId -> keyCombo
export class KeybindingsService {
  private readonly keyComboResolver: CommandToKeyComboResolver;
  private readonly commandResolver: KeyComboToCommandResolver;

  constructor(resolvedKeybindings: TCommandToKeyCombo) {
    this.keyComboResolver = new CommandToKeyComboResolver(resolvedKeybindings);
    this.commandResolver = new KeyComboToCommandResolver(resolvedKeybindings);
  }

  findByCommandId(commandId: TCommand['id']): TKeybinding | undefined {
    const keyCombo = this.keyComboResolver.findByCommandId(commandId);
    if (keyCombo == null) {
      return undefined;
    }
    return { label: formatLabel(keyCombo) };
  }

  // findAllByCommandId(commandId: TCommand['id']): Array<TKeybinding> | [];

  // findByKeyCombo(keyCombo: TKeyCombo): TCommand['id'] | undefined {
  //   return this.commandResolver.findByKeyCombo(keyCombo);
  // }
}

const TEMPORARY_RESOLVED_KEYBINDINGS: TCommandToKeyCombo = {
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

export const keybindingsService = new KeybindingsService(
  TEMPORARY_RESOLVED_KEYBINDINGS
);
