import { zip } from 'compressing'
import { templatePath } from './workdir'

export default async function add(name: string) {
  const dest = await templatePath(name)
  await zip.compressDir('.', dest)
}