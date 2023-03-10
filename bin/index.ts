#!/usr/bin/env node
import { program } from 'commander';
import { commands } from './utils/command.util';
import { defaultCommand } from './commands/default';
import figlet from 'figlet';

program.version('1.0.0');

console.log(figlet.textSync("git services"));

(async () => {
  const commandList = await commands();

  commandList.forEach(({ default: command }) => {
    const cmd = program.command(command.name)
      .description(command.description)
      .action(command.action);

    if (command.arguments) {
      command.arguments.forEach(([name, description, defaultValue]) => {
        cmd.argument(name, description, defaultValue);
      });
    }

    if (command.options) {
      command.options.forEach(([flags, description, defaultValue]) => {
        cmd.option(flags, description, defaultValue);
      });
    }
  });

  const defaultConfiguredCommand = program.command('*')
    .description(defaultCommand.description)
    .action(defaultCommand.action);

  defaultCommand.options.forEach(commandOption => {
    defaultConfiguredCommand.option(...commandOption)
  })

  defaultCommand.arguments.forEach(commandArgument => {
    defaultConfiguredCommand.argument(...commandArgument)
  })

  program.parse(process.argv);
})();