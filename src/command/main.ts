import ora from 'ora'
import Template from '~/models/Template'
import unzip from '~/utils/unzip'
import { remove } from 'fs-extra'
import Package from '~/models/Package'
import { sep } from 'path'
import { init, addRemote } from '~/utils/git'

const cwd = process.cwd()
const pkgNameOf = (path: string) => path.split(sep).pop()

export default async function main(tpl: string, dest = cwd) {
  const spinning = ora('Downloading package...').start()

  const template = await Template.create(tpl)
  await unzip(template.file, dest)
  await remove(template.path)

  spinning.info('Configure it')

  const preset = {
    name: pkgNameOf(dest),
    version: '0.1.0',
    license: 'MIT',
  }
  const pkg = await Package.fromStdin(template, preset)
  await pkg.writeTo(dest)

  if (pkg.repository) {
    await init(dest)
    await addRemote(dest, pkg.repository)
  }

  spinning.succeed('Done!')
}
