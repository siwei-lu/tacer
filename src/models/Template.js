// @flow
import fs from 'fs-promise'
import line from '../utils/line'

export interface ITemplate {
  name?: string,
  description?: string,
  repository?: string,
  author?: string,
  license?: string,
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

  constructor({...props}: ITemplate = {}) {
    Object.assign(this, props)
  }

  _replaced(content: string): string {
    return content.replace(/\$\{(.*)\}/g, (_, key: string) => this[key] || '')
  }

  async render(filePath: string): Promise<string> {
    const content: string = await fs.readFile(filePath, 'utf8')

    if (!filePath.match(/\.tpl$/)) {
      return content
    }

    return this._replaced(content)
  }

  static async fromStdin(template: string, preset: ITemplate = {}) {
    const tpl = new Template({ template })

    tpl.name = await line('package name: ', preset.name)
    tpl.description = await line('description: ')
    tpl.repository = await line('git repository: ')
    tpl.author = await line('author: ')
    tpl.license = await line('license: ', 'MIT')

    return tpl
  }
}
