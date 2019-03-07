import { promises as fs, existsSync } from 'fs'
import * as config from '../config'
import Template from '../models/Template'

export async function _isDir(path: string): Promise<boolean> {
  const stat = await fs.stat(path)
  return stat.isDirectory()
}

export async function _checkPath(path: string) {
  if (!existsSync(path)) {
    await fs.mkdir(path)
  }
}

export function _dist(path: string) {
  const result = path.match(/(.*)\.tpl$/)
  return result ? result[1]: path
}

export async function _handleFile(
  pathname: string,
  dist: string,
  tpl: Template,
) {
  dist = _dist(dist)
  const path = config.templatePath(tpl.template) + pathname

  const content = await tpl.render(path)
  await fs.writeFile(dist, content, 'utf8')
}

export async function _handleDir(
  pathname: string,
  dist: string,
  tpl: Template,
) {
  const path = config.templatePath(tpl.template) + pathname
  const subname = await fs.readdir(path)

  const promises = subname.map(async name => {
    const subname = `${pathname}/${name}`
    const subpath = config.templatePath(tpl.template) + subname
    const subdist = `${dist}/${name}`

    if (await _isDir(subpath)) {
      return _handleDir(subname, subdist, tpl)
    }

    return _handleFile(subname, subdist, tpl)
  })

  await _checkPath(dist)
  await Promise.all(promises)
}

export default async function create(tpl: Template, path: string) {
  await _handleDir('', path, tpl)
}