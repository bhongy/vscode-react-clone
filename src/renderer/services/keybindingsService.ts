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

import { TCommand } from '@/commands/main';
import {
  QuickOpenAction,
  ShowAllCommandsAction,
} from '@/commands/workbenchCommands';

interface TKeybinding {
  label: string;
}

type TKeyBindingsRegistry = Map<TCommand['id'], TKeybinding>;

// TODO: make reactive: change keybindings must cause related views to re-render
class KeybindingService {
  private _keybindingsRegistry: TKeyBindingsRegistry;

  constructor(keybindingsRegistry: TKeyBindingsRegistry) {
    this._keybindingsRegistry = keybindingsRegistry;
  }

  findByCommandId(commandId: TCommand['id']): TKeybinding | undefined {
    return this._keybindingsRegistry.get(commandId);
  }
}

const workbenchRegistry = new Map([
  [ShowAllCommandsAction.id, { label: '⇧⌘P' }],
  [QuickOpenAction.id, { label: '⌘P' }],
]);

const allRegistries = new Map([...workbenchRegistry]);

export const keybindingService = new KeybindingService(allRegistries);
