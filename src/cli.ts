#!/usr/bin/env node

import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';
import ImportCommand from './cli-command/import-command.js';
import CLIApplication from './app/cli-application.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand, new ImportCommand
]);
myManager.processCommand(process.argv);
