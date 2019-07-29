import { resolve } from 'path'

export type Info = {
  name: string
  version: string
  description: string
}

const packageJson = resolve(__dirname, '..', 'package.json')

export default function getInfo(json = packageJson): Info {
  return require(json)
}
