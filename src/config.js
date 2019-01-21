// @flow
import path from 'path'

export const templatePath = (template: string) =>
  path.resolve(__dirname, `../templates/${template}`)