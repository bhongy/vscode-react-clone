'use strict';

import {
  QuickOpenAction,
  ShowAllCommandsAction,
} from '../commands/workbenchCommands';

type TKeybinding = {
  label: string;
};

type TKeyBindingsRegistry = Map<string, TKeybinding>;
const workbenchRegistry: TKeyBindingsRegistry = new Map([
  [ShowAllCommandsAction.id, { label: '⇧⌘P' }],
  [QuickOpenAction.id, { label: '⌘P' }],
]);

// TODO: make reactive: change keybindings must cause related views to re-render
class KeybindingService {
  private _keybindingsMap: TKeyBindingsRegistry;

  public constructor(keybindingsMap: TKeyBindingsRegistry) {
    this._keybindingsMap = keybindingsMap;
  }

  public findByCommandId(commandId: string): TKeybinding | void {
    return this._keybindingsMap.get(commandId);
  }
}

export const keybindingService = new KeybindingService(workbenchRegistry);
