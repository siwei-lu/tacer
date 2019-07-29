import execCommand from './execCommand'

export function init(path: string) {
  return execCommand('git init', path)
}

export function clone(repo: string, path: string) {
  return execCommand(`git clone ${repo} ${path}`)
}

export function addRemote(path: string, repository: string) {
  return execCommand(`git remote add origin ${repository}`, path)
}
