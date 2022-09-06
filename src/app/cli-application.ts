import { CliCommandInterface } from '../cli-command/cli-command.interface.js';

export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommandInterface} = {};

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((acc, command) => {
      const cliCommand = command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

}
