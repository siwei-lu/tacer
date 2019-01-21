// @flow
import os from 'os'
import fs from 'fs-promise'
import commander from 'commander'
import Template from '../models/Template'
import create from './create'
import init from './init'

export const _dirname = (path: string) => path.split('/').pop()

export const _create = async (template: string, path: string) => {
  const name = _dirname(path)
  const tpl = await Template.fromStdin(template, { name })
  await create(tpl, path)
  await init(path)
}

export default function command() {
  commander
    .version('0.0.2')
    .arguments('<template> <path>')
    .action(_create)
    .parse(process.argv)
}