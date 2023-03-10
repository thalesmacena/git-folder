import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { Action, Command, FolderOptions } from './command';
import { execInFolders, getMaxDeep } from '../utils/folder.util';
import { printDashLine, printFinishProcess, printRepositoryProcess, printStartProcess, printStderr, printStdout } from '../utils/print.util';
import { execPromise } from '../utils/exec.uti';

const buildExecAny = (commandLine: string) => {
  
  const execAny = async (folderPath: string, stat = promisify(fs.stat)) => {
    const gitFolder = join(folderPath, '.git');
    const gitStats = await stat(gitFolder).catch(() => null);
    if (gitStats && gitStats.isDirectory()) {
      
      printRepositoryProcess(folderPath);

      try {
        const { stdout, stderr } = await execPromise(`git ${commandLine}`, { cwd: folderPath });

        printStdout(stdout);
      } catch (e: any) {
        printStderr(folderPath, e)
      }
    }
  }

  return execAny;
}

const defaultAction: Action = async (commandLine: string, {multi, deep}: FolderOptions) => {
  printStartProcess(commandLine);

  const maxDeep = getMaxDeep(multi, deep);

  const execAny = buildExecAny(commandLine)

  await execInFolders(execAny, { maxDeep })

  printFinishProcess();
}

export const defaultCommand: Command = {
  name: 'default',
  description: 'Realiza o comando git informado como argumento nas subpastas',
  action: defaultAction,
  arguments: [
    ['<commandLine>', 'Commandline to execute']
  ],
  options: [
    ['-m, --multi', 'If the folder has multirepo'],
    ['-d, --deep <deep>', 'Maximum depth of folders'],
  ]
}