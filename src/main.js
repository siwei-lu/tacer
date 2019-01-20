// @flow
import os from 'os'
import fs from 'fs-promise'
import commander from 'commander'
import Template from './models/Template'
import create from './utils/create'
import init from './utils/init'

export const _dirname = (path: string) => path.split('/').pop()

export default function main() {
  commander
    .version('0.0.2')
    .arguments('<path>')
    .action(async (path: string) => {
      const name = _dirname(path)
      const tpl = await Template.fromStdin({ name })
      await create(tpl, path)
      await init(path)
    })
    .parse(process.argv)
}