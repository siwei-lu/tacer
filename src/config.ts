import { resolve } from 'path'

export const templatePath = (template: string) =>
  resolve(__dirname, `../templates/${template}`)

export const version = () => require(resolve(__dirname, '../package.json')).version