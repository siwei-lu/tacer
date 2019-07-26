import { sep, resolve } from 'path'
import ora from 'ora'
import unzip from '~/utils/unzip'
import Package from '~/models/Package'
import Template from '~/models/Template'
import { remove } from 'fs-extra'

const cwd = process.cwd()
const pkgNameOf = (path: string) => path.split(sep).pop()

export default async function main(tpl: string, dest = cwd) {
  if (!tpl) {
    throw new Error('Template must be given.')
  }

  const spinning = ora(`Downloading package...`).start()

  const template = await Template.create(tpl)
  await unzip(template.file, dest)
  await remove(template.path)

  spinning.info('Configure The Package')

  const pkg = await Package.fromStdin(template, {
    name: pkgNameOf(dest),
    version: '0.1.0',
    license: 'MIT',
  })

  const pkgPath = resolve(dest, 'package.json')
  await pkg.writeTo(pkgPath)

  spinning.succeed('Done!')
}
