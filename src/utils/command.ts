import * as commander from 'commander'
import Template from '../models/Template'
import create from './create'
import init from './init'
import { version } from '../config'

export function _dirname(path: string) {
  return path.split('/').pop()
}

export async function _create(template: string, path: string) {
  const name = _dirname(path)
  const tpl = await Template.fromStdin(template, { name })

  await create(tpl, path)
  await init(path)
}

export default function command() {
  commander
    .version(version())
    .arguments('<template> <path>')
    .action(_create)
    .parse(process.argv)
}