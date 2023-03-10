export const printDashLine = () => {
  console.log('-'.repeat(process.stdout.columns));
}

export const printHashLine = () => {
  console.log('#'.repeat(process.stdout.columns));
}

export const printStartProcess = (commandLine: string) => {
  console.log(`
    # STARTING THE PROCESS OF THE REPOSITORIES
    # $ ${commandLine}
  `);
  printHashLine();
  console.log();
}

export const printFinishProcess = () => {
  console.log();
  printHashLine();
  console.log();
}

export const printRepositoryProcess = (folderPath: string) => {
  console.log(`

  Running the commands in the repository ${folderPath}

  `);
}

export const printStdout = (stdout: string) => {
  printDashLine();
  console.log();
  console.log(stdout)
  printDashLine();
}

export const printStderr = (folderPath: string, e: Error) => {
  printDashLine();
  console.log();
  console.error(`Error executing commands in folder ${folderPath}: ${e.message}`);
  printDashLine();
}

