import { resolve } from 'path'
import { remove } from 'fs-extra'

export default async function clean(templatePath: string) {
  const tempDir = resolve(templatePath, '..')
  await remove(tempDir)
}
