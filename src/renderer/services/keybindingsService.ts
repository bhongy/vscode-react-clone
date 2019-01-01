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

// TODO: using alias import break tests - fix jest config (moduleNameMapper)
import { TKeyCombo, formatLabel } from '@code/keyCombo';
// TODO: create keybinding resolvers that takes default/user configs
// so we don't hardcode these into the keybinding service
import {
  QuickOpenAction,
  ShowAllCommandsAction,
} from '@code/commands/workbenchCommands';

// Partial -> lookup can fail
type TStringToKeyCombo = Partial<{ readonly [k: string]: TKeyCombo }>;

// look up by CommandId rather than Command
// because CommandId is the data that's being passed around the system
class CommandToKeyComboResolver {
  private readonly record: TStringToKeyCombo;

  constructor(resolvedKeybindings: TStringToKeyCombo) {
    this.record = resolvedKeybindings;
  }

  findByCommandId(commandId: string): TKeyCombo | undefined {
    return this.record[commandId];
  }
}

class KeyComboToCommandResolver<T extends TStringToKeyCombo, CommandId = keyof T> {
  // Partial -> lookup can fail
  // value type is `keyof T` because we know it's not just any string
  // return type of string here is not very useful
  private readonly record: Partial<{ [serializedKeyCombo: string]: CommandId }>;
  // TODO: abstract get/set on record (probably use proxy) so formatKey is hidden
  // and the key can just conceptually be the TKeyCombo object
  private static formatKey = formatLabel;

  constructor(resolvedKeybindings: T) {
    this.record = Object.entries(resolvedKeybindings)
      .filter(
        (entry): entry is [string, TKeyCombo] => {
          const [, keyCombo] = entry;
          return keyCombo != null;
        }
      )
      .map(([commandId, keyCombo]) => [
        commandId,
        KeyComboToCommandResolver.formatKey(keyCombo),
      ])
      .reduce(
        (prev, [commandId, k]) => Object.assign(prev, { [k]: commandId }),
        {}
      );
  }

  // return `K` because we can guarantee the exact set of the output
  // if the lookup fail we return undefined
  findByKeyCombo(keyCombo: TKeyCombo): CommandId | undefined {
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
export class KeybindingsService<T extends TStringToKeyCombo> {
  private readonly keyComboResolver: CommandToKeyComboResolver;
  private readonly commandResolver: KeyComboToCommandResolver<T>;

  constructor(resolvedKeybindings: T) {
    this.keyComboResolver = new CommandToKeyComboResolver(resolvedKeybindings);
    this.commandResolver = new KeyComboToCommandResolver(resolvedKeybindings);
  }

  findByCommandId(commandId: string): TKeybinding | undefined {
    const keyCombo = this.keyComboResolver.findByCommandId(commandId);
    return typeof keyCombo !== 'undefined'
      ? { label: formatLabel(keyCombo) }
      : undefined;
  }

  // findAllByCommandId(commandId: keyof T): Array<TKeybinding> | [];

  findByKeyCombo(keyCombo: TKeyCombo): keyof T | undefined {
    return this.commandResolver.findByKeyCombo(keyCombo);
  }
}

const TEMPORARY_RESOLVED_KEYBINDINGS = {
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
