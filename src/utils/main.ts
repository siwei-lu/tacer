import { spawn } from 'child_process'

const cwd = process.cwd()

export default function main(template: string, path = cwd) {
  if (!template) {
    throw new Error('Template must be given.')
  }

  const tplname = `tacer-template-${template}`
  spawn('npx', [tplname, path], { stdio: 'inherit' })
}
