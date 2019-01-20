// @flow
import os from 'os'
import fs from 'fs-promise'
import commander from 'commander'
import Template from './models/Template'
import create from './modules/create'
import init from './modules/init'

export default function run() {
  commander
    .version('0.0.2')
    .arguments('<path>')
    .action(async (path: string) => {
      const tpl = await Template.fromStdin()
      await create(tpl, path)
      await init(path)
    })
    .parse(process.argv)
}