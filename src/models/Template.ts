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

  _renderTpl(content: string): string {
    return content.replace(/\$\{(.*)\}/g, (_, key: string) => this[key] || '')
  }

  _renderEjs(content: string): string {
    return ejs.render(content, this)
  }

  async render(filePath: string): Promise<string> {
    const content: string = await fs.readFile(filePath, 'utf8')

    if (filePath.match(/\.ejs$/)) {
      return this._renderEjs(content)
    }

    if (filePath.match(/\.tpl$/)) {
      return this._renderTpl(content)
    }

    return content
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
