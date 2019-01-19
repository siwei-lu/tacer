// @flow
import fs from 'fs-promise'
import line from '../modules/line'

export default class Template {
  $key: string
  $value: string

  name: string
  description: string
  repository: string
  author: string
  license: string

  constructor({...props}: Template = {}) {
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

  static async fromStdin() {
    const tpl = new Template()

    tpl.name = await line('package name: ')
    tpl.description = await line('description: ')
    tpl.repository = await line('git repository: ')
    tpl.author = await line('author: ')
    tpl.license = await line('license: ')

    return tpl
  }
}
