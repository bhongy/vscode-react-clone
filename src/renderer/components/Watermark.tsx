'use strict';

import * as React from 'react';
import { QuickOpenAction, ShowAllCommandsAction } from 'commands/workbenchCommands';
// TODO: pass via context - don't import as a singleton
// another idea is to separate data from operations
//   pass keybindingMap via context
//   and instantiate the service here using the keybindingMap
import { keybindingService } from '../services/keybindingsService';
// import { isMacintosh } from '../services/environmentService';
import './Watermark.css';

// TEMPORARY - implement i18n module
const i18n = {
  localize(key: string, content: string): string {
    return content;
  },
};

type TWatermarkEntry = {
  text: string;
  ids: Array<string>;
};

const quickopen: TWatermarkEntry = {
  text: i18n.localize('watermark.quickOpen', 'Go to File'),
  ids: [QuickOpenAction.ID],
};

const showCommands: TWatermarkEntry = {
  text: i18n.localize('watermark.showCommands', 'Show All Commands'),
  ids: [ShowAllCommandsAction.ID],
};

const noFolderEntries: Array<TWatermarkEntry> = [showCommands, quickopen];
const folderEntries: Array<TWatermarkEntry> = [];

const unboundedText = i18n.localize('watermark.unboundCommand', 'unbound');
const Entry = ({ text, ids }: TWatermarkEntry) => (
  <dl className="watermark__entry">
    <dt>{text}</dt>
    <dd>
      {ids.map(id => {
        const k = keybindingService.getById(id);
        return (
          <pre key={id} className="shortcuts">
            {k != null ? k.label : unboundedText}
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
        {entries.map(({ text, ids }) => (
          <Entry key={ids.toString()} text={text} ids={ids} />
        ))}
      </div>
    </div>
  );
};
