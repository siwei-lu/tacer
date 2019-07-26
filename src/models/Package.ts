import prompt from '~/utils/prompt'
import { readFile, writeFile } from 'fs-extra'

export interface IPackage {
  name?: string
  version?: string
  description?: string
  repository?: string
  keywords?: string[]
  author?: string
  license?: string
}

export default class Package implements IPackage {
  name: string
  version: string
  description: string
  repository: string
  keywords: string[]
  author: string
  license: string

  constructor(props: IPackage) {
    Object.assign(this, props)
  }

  static async fromStdin(preset: IPackage = {}) {
    const name = await prompt('package name', preset.name)
    const version = await prompt('version', preset.version)
    const description = await prompt('description', preset.description)
    const repository = await prompt('git repository', preset.repository)
    const keywords = await prompt('keywords').then(result =>
      result.split(/\s+/)
    )
    const author = await prompt('author', preset.author)
    const license = await prompt('license', preset.license)

    return new Package({
      name,
      version,
      description,
      repository,
      keywords,
      author,
      license,
    })
  }

  // TODO: inject the template as devDependencies automatically
  async writeTo(pkgPath: string) {
    const content = await readFile(pkgPath, 'utf8')
    const pkg = JSON.parse(content)

    Object.assign(pkg, this)
    const newContent = JSON.stringify(pkg, null, 2)
    await writeFile(pkgPath, newContent)
  }
}
