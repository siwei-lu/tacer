import { promises as fs } from 'fs'
import Template from '../models/Template'
import { templateDir } from './workdir'
import { copyDir, CopyFileCallbackOption } from './common'
import init from './init'

export const _destname = (path: string) => {
  const result = path.match(/(.*)\.(tpl|ejs)$/)
  return result ? result[1] : path
}

export const _dirname = (path: string) => path.split('/').pop()

export const render = (tpl: Template) =>
  ({ filename, content }: CopyFileCallbackOption) => {
    if (filename.match(/\.tpl$/)) {
      filename = _destname(filename)
      content = tpl.renderTpl(content)
    } else if (filename.match(/\.ejs$/)) {
      filename = _destname(filename)
      content = tpl.renderEjs(content)
    }
    return { filename, content }
  }

export default async function create(template: string, path: string) {
  const name = _dirname(path)
  const tpl = await Template.fromStdin(template, { name })
  const src = await templateDir(template)

  await copyDir(src, path, render(tpl))
  init()
}