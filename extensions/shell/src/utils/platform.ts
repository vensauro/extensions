import os from "os";

export const isWin = process.platform === "win32";
export const isMac = process.platform === "darwin";

export const getHomeDir = () => process.env.HOME || process.env.USERPROFILE || os.homedir();

export function escapeForDoubleQuotes(s: string) {
  return s.replace(/"/g, '\\"');
}

export function buildExecCommand(cmd: string, execEnvShell?: string, interactive = true): string {
  if (isWin) {
    const escaped = escapeForDoubleQuotes(cmd);
    // Use PowerShell by default on Windows
    return `powershell.exe -NoProfile -Command "${escaped}"`;
  }

  const shell = execEnvShell || process.env.SHELL || "/bin/bash";
  const escaped = escapeForDoubleQuotes(cmd);
  // keep interactive flag for POSIX shells
  return `${shell} ${interactive ? "-i" : ""} -c "${escaped}"`;
}
