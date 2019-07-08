import { spawn } from 'child_process'
import template from './template'

const cwd = process.cwd()

export default function main(tpl: string, path = cwd) {
  if (!tpl) {
    throw new Error('Template must be given.')
  }

  const tplname = template(tpl)
  spawn('npx', [tplname, path], { stdio: 'inherit' })
}
