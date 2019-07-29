import { init } from '~/utils/git'
import { mkdtemp, pathExists, remove } from 'fs-extra'
import { resolve } from 'path'

describe('init()', () => {
  test('given a path, it should init a git repository', async () => {
    const tmpdir = await mkdtemp('test-init').then(p => resolve(p))
    await init(tmpdir)

    expect(await pathExists(resolve(tmpdir, '.git'))).toBeTruthy()
    await remove(tmpdir)
  })
})
