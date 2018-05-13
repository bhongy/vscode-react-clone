'use strict';

import * as React from 'react';
import styled from 'react-emotion';
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

const Shortcut = styled('pre')`
  padding-left: 0.5em;
  padding-right: 0.5em;
  letter-spacing: 0.25em;
`;

const Entry = ({ text, ids }: WatermarkEntry) => (
  <dl className="watermark__entry">
    <dd>{text}</dd>
    <dt>
      {ids.map(id => {
        const k = keybindingsService.getById(id);
        return <Shortcut key={id}>{k.label}</Shortcut>;
      })}
    </dt>
  </dl>
);

export const Watermark = () => {
  const entries = noFolderEntries;
  return (
    <div className="watermark">
      {entries.map(({ text, ids }, i) => (
        <Entry key={i} text={text} ids={ids} />
      ))}
    </div>
  );
};
