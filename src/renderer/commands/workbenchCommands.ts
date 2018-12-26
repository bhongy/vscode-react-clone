'use strict';

export interface TQuickOpenAction {
  readonly id: 'workbench.action.quickOpen';
}

export const QuickOpenAction: TQuickOpenAction = {
  id: 'workbench.action.quickOpen',
};

export interface TShowAllCommandsAction {
  readonly id: 'workbench.action.showCommands';
}

export const ShowAllCommandsAction: TShowAllCommandsAction = {
  id: 'workbench.action.showCommands',
};
