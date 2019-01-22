// @flow
import path from 'path'

export const templatePath = (template: string) =>
  path.resolve(__dirname, `../templates/${template}`)

export const version = () => require(path.resolve(__dirname, '../package.json')).version