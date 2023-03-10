import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { Command, FolderOptions } from './command';
import { execInFolders, getMaxDeep } from '../utils/folder.util';
import { CheckoutOptions } from './command.d';
import { printDashLine, printFinishProcess, printRepositoryProcess, printStartProcess, printStderr, printStdout } from '../utils/print.util';
import { getCheckoutStringOption } from './../utils/checkout.util';
import { execPromise } from '../utils/exec.uti';

const buildExecReset = (branch: string, checkoutStringOption: string) => {
  
  const execReset = async (folderPath: string, stat = promisify(fs.stat)) => {
    const gitFolder = join(folderPath, '.git');
    const gitStats = await stat(gitFolder).catch(() => null);
    if (gitStats && gitStats.isDirectory()) {
      
      printRepositoryProcess(folderPath);

      try {
        const { stdout, stderr } = await execPromise(`git reset --hard && git checkout ${checkoutStringOption} ${branch} ${checkoutStringOption.length ? '' : '&& git pull'}`, { cwd: folderPath });

        printStdout(stdout);
      } catch (e: any) {
        printStderr(folderPath, e)
      }
    }
  }

  return execReset;
}

const resetAction = async (branch: string, {multi, deep, ...checkoutOptions}: FolderOptions & CheckoutOptions) => {
  const checkoutStringOption = getCheckoutStringOption(checkoutOptions);
  
  printStartProcess(`git reset --hard && git checkout ${checkoutStringOption} ${branch}`);

  const maxDeep = getMaxDeep(multi, deep);

  const execReset = buildExecReset(branch, checkoutStringOption)

  await execInFolders(execReset, { maxDeep })

  printFinishProcess();
}

const resetCommand: Command = {
  name: 'reset-to',
  description: 'Executa os comandos git reset --hard, git checkout e git pull em todas as subpastas com .git',
  action: resetAction,
  arguments: [
    ['<branch>', 'Branch to reset']
  ],
  options: [
    ['-m, --multi', 'If the folder has multirepo'],
    ['-d, --deep <deep>', 'Maximum depth of folders'],
    ['-b', 'Create a new branch'],
    ['-B', 'Create a new branch, if it already exists, then reset it'],
    ['--orphan', 'Create a new orphan branch'],
  ]
} 

export default resetCommand;