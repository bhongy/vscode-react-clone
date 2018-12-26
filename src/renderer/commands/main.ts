'use strict';

import { TQuickOpenAction, TShowAllCommandsAction } from '@/commands/workbenchCommands';

export type TCommand = TQuickOpenAction | TShowAllCommandsAction;
