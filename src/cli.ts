import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';
import CLIApplication from './app/cli-application.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand
]);
myManager.processCommand(process.argv);
