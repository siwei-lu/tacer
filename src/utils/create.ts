import { promises as fs } from 'fs'
import Template from '../models/Template'
import { templateDir } from './workdir'
import { isDir, checkPath } from './common'

export const _destname = (path: string) => {
  const result = path.match(/(.*)\.(tpl|ejs)$/)
  return result ? result[1] : path
}

export const _dirname = (path: string) => path.split('/').pop()

export async function _handleFile(
  pathname: string,
  destname: string,
  tpl: Template,
) {
  destname = _destname(destname)
  const path = await templateDir(tpl.template) + pathname

  const content = await tpl.render(path)
  await fs.writeFile(destname, content, 'utf8')
}

export async function _handleDir(
  pathname: string,
  dest: string,
  tpl: Template,
) {
  const path = await templateDir(tpl.template) + pathname
  const subnames = await fs.readdir(path)

  const promises = subnames.map(async name => {
    const subname = `${pathname}/${name}`
    const subpath = await templateDir(tpl.template) + subname
    const subdest = `${dest}/${name}`

    console.log(subname)

    if (await isDir(subpath)) {
      return _handleDir(subname, subdest, tpl)
    }

    return _handleFile(subname, subdest, tpl)
  })

  await checkPath(dest)
  await Promise.all(promises)
}

export default async function create(template: string, path: string) {
  const name = _dirname(path)
  const tpl = await Template.fromStdin(template, { name })

  await _handleDir('', path, tpl)
}