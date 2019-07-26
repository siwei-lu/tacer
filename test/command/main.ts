import main from '~/command/main'
import { expect } from 'chai'
import { mkdtemp, pathExists, remove } from 'fs-extra'
import { join } from 'path'

describe('main()', () => {
  describe('given no parameter', () => {
    it('should throw an error ', () => {
      expect(main).throw
    })
  })

  // describe('given koa and a tmpdir', () => {
  //   it('should download the koa template and extract it to the tmpdir', async () => {
  //     const tmpdir = await mkdtemp('main')
  //     await main('koa', tmpdir)
  //     const srcIndex = join(tmpdir, 'src', 'index.ts')

  //     expect(await pathExists(srcIndex)).true
  //     await remove(tmpdir)
  //   }).timeout(20000)
  // })
})
