import getTemplate from '~/utils/getTemplate'
import unzip from '~/utils/unzip'
import clean from '~/utils/clean'
import Package from '~/models/Package'
import { sep, join } from 'path'

const cwd = process.cwd()
const pkgNameOf = (path: string) => path.split(sep).pop()

export default async function main(tpl: string, dest = cwd) {
  if (!tpl) {
    throw new Error('Template must be given.')
  }

  const tplpath = await getTemplate(tpl)
  await unzip(tplpath, dest)
  await clean(tplpath)

  const pkg = await Package.fromStdin({
    name: pkgNameOf(dest),
    version: '0.1.0',
    license: 'MIT',
  })

  const pkgPath = join(dest, 'package.json.tpl')
  await pkg.writeTo(pkgPath)
}
