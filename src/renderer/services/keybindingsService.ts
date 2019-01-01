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
 *
 * Type on TCommand because the application define the complete list of supported commands
 * hence we know the exact possible values of command id(s) at compile time.
 * TCommand is the ubiquitous language in the application.
 */

import { TKeyCombo, formatLabel } from '@code/keyCombo';
import { TCommand } from '@code/commands/main';
// TODO: create keybinding resolvers that takes default/user configs
// so we don't hardcode these into the keybinding service
import {
  QuickOpenAction,
  ShowAllCommandsAction,
} from '@code/commands/workbenchCommands';

// Partial<...>
// - to ensurce lookup failure (undefined) is handled
// - to allow using subset of `TCommand` to configure the service in testing
type TCommandIdToKeyCombo = Partial<
  { readonly [K in TCommand['id']]: TKeyCombo }
>;

// look up by CommandId rather than Command
// because CommandId is the data that's being passed around the system
class CommandToKeyComboResolver {
  private readonly record: TCommandIdToKeyCombo;

  constructor(resolvedKeybindings: TCommandIdToKeyCombo) {
    this.record = resolvedKeybindings;
  }

  findByCommandId(commandId: TCommand['id']): TKeyCombo | undefined {
    return this.record[commandId];
  }
}

class KeyComboToCommandResolver {
  // Partial<...> to ensurce lookup failure (undefined) is handled
  private readonly record: Partial<{
    readonly [serializedKeyCombo: string]: TCommand['id'];
  }>;
  // TODO: abstract get/set on record (probably use proxy) so formatKey
  // is hidden and the key can just conceptually be the TKeyCombo object
  private static formatKey = formatLabel;

  constructor(resolvedKeybindings: TCommandIdToKeyCombo) {
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

  constructor(resolvedKeybindings: TCommandIdToKeyCombo) {
    this.keyComboResolver = new CommandToKeyComboResolver(resolvedKeybindings);
    this.commandResolver = new KeyComboToCommandResolver(resolvedKeybindings);
  }

  findByCommandId(commandId: TCommand['id']): TKeybinding | undefined {
    const keyCombo = this.keyComboResolver.findByCommandId(commandId);
    return typeof keyCombo !== 'undefined'
      ? { label: formatLabel(keyCombo) }
      : undefined;
  }

  // findAllByCommandId(commandId: keyof T): Array<TKeybinding> | [];

  findByKeyCombo(keyCombo: TKeyCombo): TCommand['id'] | undefined {
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
