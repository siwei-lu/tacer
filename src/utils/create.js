// @flow
import fs from 'fs-promise'
import path from 'path'
import * as config from '../config'
import type Template from '../models/Template'

export const _isDir = async (path: string): Promise<boolean> => {
  const stat = await fs.stat(path)
  return stat.isDirectory()
}

export const _checkPath = async (path: string) => {
  const isExists = await fs.exists(path)
  if (!isExists) {
    await fs.mkdir(path)
  }
}

export const _dist = (path: string) => {
  const result = path.match(/(.*)\.tpl$/)
  return result ? result[1] : path
}

export const _handleFile = async (
  pathname: string,
  dist: string,
  tpl: Template,
) => {
  dist = _dist(dist)
  const path = config.templatePath(tpl.template) + pathname

  const content = await tpl.render(path)
  await fs.writeFile(dist, content, 'utf8')
}

export const _handleDir = async (
  pathname: string,
  dist: string,
  tpl: Template,
) => {
  const path = config.templatePath(tpl.template) + pathname
  const subnames = await fs.readdir(path)

  const promises = subnames.map(async name => {
    const subname = `${pathname}/${name}`
    const subpath = config.templatePath(tpl.template) + subname
    const subdist = `${dist}/${name}`

    if (await _isDir(subpath)) {
      return await _handleDir(subname, subdist, tpl)
    }

    return await _handleFile(subname, subdist, tpl)
  })

  await _checkPath(dist)
  await Promise.all(promises)
}

export default async function create(tpl: Template, path: string) {
  await _handleDir('', path, tpl)
}