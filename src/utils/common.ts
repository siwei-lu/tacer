import { promises as fs, existsSync } from 'fs'

export const isDir = (path: string) =>
  fs.stat(path).then(s => s.isDirectory())

export async function checkPath(path: string) {
  if (!existsSync(path)) {
    await fs.mkdir(path)
  }
}