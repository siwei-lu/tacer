import { spawn } from 'child_process'

export default function execCommand(line: string, cwd = process.cwd()) {
  const [command, ...args] = line.split(/\s+/)
  const cp = spawn(command, args, { cwd })

  return new Promise<void>((res, rej) => {
    cp.on('error', err => {
      rej(err)
    }).on('exit', code => {
      code === 0 && res()
    })
  })
}
