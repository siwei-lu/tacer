import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import { apply, pipe } from 'ramda'

export const prependTo = <T>(list: T[]) => (el: T) => [el, ...list]

export const readFileInUTF8 = (path: string) =>
  readFileSync(path, { encoding: 'utf-8' })

export const projectDir = () => resolve(__dirname, '..')

export const pathInProjectDir = (...paths: string[]) =>
  pipe(projectDir, prependTo(paths), apply(join))
