// @flow
import os from 'os'
import fs from 'fs-promise'
import commander from 'commander'
import Template from '../models/Template'
import create from './create'
import init from './init'
import pkg from '../../package.json'

export default function run() {
  commander
    .version(pkg.version)
    .arguments('<path>')
    .action(async (path: string) => {
      const tpl = await Template.fromStdin()
      await create(tpl, path)
      await init(path)
    })
    .parse(process.argv)
}