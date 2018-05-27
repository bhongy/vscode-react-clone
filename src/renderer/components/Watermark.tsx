'use strict';

import * as React from 'react';
import { QuickOpenAction, ShowAllCommandsAction } from './quickopen/commands';
import './Watermark.css';

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
        return '⇧⌘P';
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
  <dl className="watermark__entry">
    <dt>{text}</dt>
    <dd>
      {ids.map(id => {
        const k = keybindingsService.getById(id);
        return (
          <pre key={id} className="shortcuts">
            {k.label}
          </pre>
        );
      })}
    </dd>
  </dl>
);

export const Watermark = () => {
  const entries = noFolderEntries;
  return (
    <div className="watermark">
      <div className="watermark__content">
        {entries.map(({ text, ids }, i) => (
          <Entry key={i} text={text} ids={ids} />
        ))}
      </div>
    </div>
  );
};
