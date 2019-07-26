import unzip from '~/utils/unzip'
import { resolve, join } from 'path'
import { mkdtemp, pathExists, remove } from 'fs-extra'
import { expect } from 'chai'

describe('unzip()', () => {
  describe('given a zip filepath', () => {
    it('should unzip the file to the dest', async () => {
      const path = resolve(__dirname, '../resources/template.zip')
      const tmpdir = await mkdtemp('unzip')

      await unzip(path, tmpdir)
      const srcIndex = join(tmpdir, 'src', 'index.ts')
      expect(await pathExists(srcIndex)).true
      await remove(tmpdir)
    })
  })
})
