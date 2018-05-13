'use strict';

import * as React from 'react';
import { QuickOpenAction, ShowAllCommandsAction } from './quickopen/commands';

// TEMPORARY - implement i18n module
const i18n = {
  localize(key: string, content: string): string {
    return content;
  },
};

// TEMPORARY - implement and pass via context
interface ResolvedKeybinding {
  label: string;
}
const keybindingsService = {
  // TODO: alias to Keybindings.ID
  getById(id: string): ResolvedKeybinding {
    return {
      get label() {
        return '⇧ ⌘ P';
      },
    };
  },
};

interface WatermarkEntry {
  text: string;
  ids: Array<string>;
}

const quickopen: WatermarkEntry = {
  text: i18n.localize('watermark.quickOpen', 'Go to File'),
  ids: [QuickOpenAction.ID],
};

const showCommands: WatermarkEntry = {
  text: i18n.localize('watermark.showCommands', 'Show All Commands'),
  ids: [ShowAllCommandsAction.ID],
};

const noFolderEntries: Array<WatermarkEntry> = [showCommands, quickopen];
const folderEntries: Array<WatermarkEntry> = [];

const Entry = ({ text, ids }: WatermarkEntry) => (
  <dl>
    <dd>{text}</dd>
    <dt>
      {ids.map(id => {
        const k = keybindingsService.getById(id);
        return (
          <span key={id} className="shortcuts">
            {k.label}
          </span>
        );
      })}
    </dt>
  </dl>
);

export const Watermark = () => {
  const entries = noFolderEntries;
  return (
    <div>
      {entries.map(({ text, ids }, i) => (
        <Entry key={i} text={text} ids={ids} />
      ))}
    </div>
  );
};
