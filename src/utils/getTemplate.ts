import { extract } from 'pacote'
import { mkdirs } from 'fs-extra'
import { join } from 'path'
import { tmpdir } from 'os'
import downloadRepo from 'download-git-repo'

const isUrl = (pattern: string) => !!pattern.match(/^https?:/)
const wrappedOf = (name: string) => `tacer-template-${name}`
const tplNameOf = (url: string) =>
  url
    .split('/')
    .pop()
    .split('tacer-template-')
    .pop()

async function tempDir(name: string) {
  const path = join(tmpdir(), 'tacer', name + '.' + Date.now())
  await mkdirs(path)
  return path
}

async function getFromNpm(name: string) {
  const wrapped = wrappedOf(name)
  const dest = await tempDir(name)

  await extract(wrapped, dest)
  return dest
}

async function getFromGit(url: string) {
  const tplName = tplNameOf(url)
  const dest = await tempDir(tplName)

  url = 'direct:' + url
  return new Promise<string>((resolve, reject) =>
    downloadRepo(url, dest, { clone: true }, err =>
      err ? reject(err) : resolve(dest)
    )
  )
}

export default async function getTemplate(tpl: string) {
  const getTemplate = isUrl(tpl) ? getFromGit : getFromNpm
  const dest = await getTemplate(tpl)
  return join(dest, 'template.zip')
}
