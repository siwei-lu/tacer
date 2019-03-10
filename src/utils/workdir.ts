import { homedir, tmpdir } from 'os'
import { zip } from 'compressing'
import { checkPath } from './common'

export const _workdir = homedir() + '/.tacer'
export const _tmpdir = tmpdir() + '/lu.siwei.tacer'

export async function tmpDir() {
  await checkPath(_tmpdir)
  return _tmpdir
}

export async function templatesDir() {
  const wd = await workdir()
  const td = wd + '/templates'

  await checkPath(td)
  return td
}

export async function templatePath(name: string) {
  const td = await templatesDir()
  return `${td}/${name}.zip`
}

export async function templateDir(name: string) {
  const target = await templatePath(name)  
  const tmpdir = await tmpDir()
  const dest = `${tmpdir}/${name}`

  await zip.uncompress(target, dest)
  return dest
}

export default async function workdir() {
  await checkPath(_workdir)
  return _workdir
}
