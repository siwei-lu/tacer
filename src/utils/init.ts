import { execSync } from 'child_process'

export default function init(path: string) {
  console.log('Downloading dependencies...')
  execSync('npm install', { cwd: path })
  console.log('Have fun!')
}