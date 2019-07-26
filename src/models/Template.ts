import { join } from 'path'
import { tmpdir } from 'os'
import { mkdirs } from 'fs-extra'
import downloadRepo from 'download-git-repo'
import { extract } from 'pacote'

const isUrl = (pattern: string) => !!pattern.match(/^https?:/)
const wrappedOf = (name: string) => `tacer-template-${name}`
const templateNameOf = (url: URL) => url.pathname.split('/').pop()

async function tempDir(name: string) {
  const path = join(tmpdir(), 'tacer', name + '.' + Date.now())
  await mkdirs(path)
  return path
}

async function downloadFromGit(url: URL) {
  const templateName = templateNameOf(url)
  const dest = await tempDir(templateName)

  const href = 'direct:' + url.href
  return new Promise<string>((res, rej) =>
    downloadRepo(href, dest, { clone: true }, err =>
      err ? rej(err) : res(dest)
    )
  )
}

async function downloadFromNpm(tpl: string) {
  const wrapped = wrappedOf(tpl)
  const dest = await tempDir(tpl)

  await extract(wrapped, dest)
  return dest
}

export default class Template {
  private _version: string
  private _url: URL
  private _path: string
  name: string

  get tag() {
    if (this._url) {
      return this._url.href
    }
    return '^' + this._version
  }

  get path() {
    return this._path
  }

  get file() {
    return join(this._path, 'template.zip')
  }

  set path(val: string) {
    const packagePath = join(val, 'package.json')
    const pkg = require(packagePath)

    this.name = pkg.name
    this._version = pkg.version
    this._path = val
  }

  static async create(tpl: string) {
    const template = new Template()

    if (isUrl(tpl)) {
      template._url = new URL(tpl)
      template.path = await downloadFromGit(template._url)
    } else {
      template.path = await downloadFromNpm(tpl)
    }

    return template
  }
}
