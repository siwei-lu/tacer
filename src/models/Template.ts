import * as ejs from 'ejs'
import { promises as fs } from 'fs'
import line from '../utils/line'
import { version } from 'punycode';

export interface ITemplate {
  name?: string,
  description?: string,
  repository?: string,
  author?: string,
  license?: string,
  template?: string,
  version?: string,
}

export default class Template implements ITemplate {
  $key: string
  $value: string

  template: string
  name: string
  description: string
  repository: string
  author: string
  license: string
  version: string

  constructor({...props}: ITemplate = {}) {
    Object.assign(this, props)
  }

  renderTpl(content: string): string {
    return content.replace(/\$\{(.*)\}/g, (_, key: string) => this[key] || '')
  }

  renderEjs(content: string): string {
    return ejs.render(content, this)
  }

  static async fromStdin(template: string, preset: ITemplate = {}) {
    const tpl = new Template({ template })

    tpl.name = await line('package name: ', preset.name)
    tpl.version = await line('version: ', '0.1.0')
    tpl.description = await line('description: ')
    tpl.repository = await line('git repository: ')
    tpl.author = await line('author: ')
    tpl.license = await line('license: ', 'MIT')

    return tpl
  }
}
