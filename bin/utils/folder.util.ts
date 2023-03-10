import { promises as fs } from 'fs';
import { join } from 'path';

type FolderCommand = (folderPath: string, stat?: any) => Promise<void>

type ExecOptions = {
  maxDeep?: number
}

const execInFolderRecursively = async (func: FolderCommand, folderPath: string, maxDeep = 0, actualDeep = 0) => {
  if (actualDeep <= maxDeep) {
    const stats = await fs.stat(folderPath);
    if (stats.isDirectory()) {
      await func(folderPath);
      
      const folders = await fs.readdir(folderPath);
      
      for await (let folder of folders) {
        const newFolderPath = join(folderPath, folder);
        await execInFolderRecursively(func, newFolderPath, maxDeep, actualDeep + 1);
      }
    }
  }
}

export const execInFolders = async (func: FolderCommand, { maxDeep = 0 }: ExecOptions ) => {
  const dir = process.cwd();
  const folders = await fs.readdir(dir);
  for await (let folder of folders) {
    const folderPath = join(dir, folder);
    const stats = await fs.stat(folderPath);
    if (stats.isDirectory()) {
      await execInFolderRecursively(func, folderPath, maxDeep, 0);
    }
  }
}

export const getMaxDeep = (multi?: boolean, deep?: number) => {
  if (deep) return deep - 1;
  if (multi) return 1;
  return 0;
}