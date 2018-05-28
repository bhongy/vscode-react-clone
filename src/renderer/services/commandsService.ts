'use strict';

type TCommand = {
  id: string;
};

// use class to control private, public interfaces
class CommandRegistry {
  private _commands = new Map<string, Array<TCommand>>();

  public get(id: string): Array<TCommand> {
    return this._commands.get(id) || [];
  }

  public set(id: string, command: TCommand): this {
    this._commands.set(id, [...this.get(id), command]);
    return this;
  }
}

const commandRegistry = new CommandRegistry();

// class CommandService {}
