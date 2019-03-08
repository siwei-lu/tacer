import { expect } from 'chai'
import { existsSync, promises as fs } from 'fs'
import { isDir, checkPath } from '../../../src/utils/common'

describe('Common Util', () => {
  it('should return true if the path is a directory', async () => {
    expect(await isDir('.')).true
    expect(await isDir('./README.md')).false
  })

  it('should make a new directory if the path is not exists', async () => {
    const tmpPath = './.tmp'

    expect(existsSync(tmpPath)).false
    await checkPath(tmpPath)
    expect(await isDir(tmpPath)).true

    await fs.rmdir(tmpPath)
  })
})