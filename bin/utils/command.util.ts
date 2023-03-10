import { Command } from "../commands/command";
import { join } from 'path';
import requireAll from 'require-all';

export interface CommandDirectory {
  default: Command
}

export const commands = async (): Promise<CommandDirectory[]> => {
  const path = join(__dirname, '..', 'commands');
  const directories = requireAll({
    dirname: path,
    filter: /.+\.command\.(js|ts)$/,
    map: function (name: string, path: string) {
      const filename = path.substring(path.lastIndexOf("/") + 1);
      return filename;
    }
  });

  return Object.values(directories).flat();
}