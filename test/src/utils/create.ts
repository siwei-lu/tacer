import { expect } from 'chai'
import { promises as fs, existsSync } from 'fs'
import { execSync } from 'child_process'
import create, { _isDir, _checkPath, _handleDir, _handleFile } from '../../../src/utils/create'
import Template from '../../../src/models/Template'

const tpl = new Template({
  template: 'react',
  name: 'test',
  description: 'this is a test description',
  author: 'Idan Loo <im@siwei.lu>',
  repository: 'https://github.com/IdanLoo/ReactCreator.git'
})

describe('Creator util', () => {
  it('should return true if the path is a directory', async () => {
    expect(await _isDir('.')).true
    expect(await _isDir('./README.md')).false
  })

  it('should make a new directory if the path is not exists', async () => {
    const tmpPath = './.tmp'

    expect(existsSync(tmpPath)).false
    await _checkPath(tmpPath)
    expect(await _isDir(tmpPath)).true

    await fs.rmdir(tmpPath)
  })

  it('should create a project via the template', async () => {
    const path = './.test-create'

    await create(tpl, path)
    expect(await _isDir(path)).true
    expect(await _isDir(`${path}/src`)).true
    expect(existsSync(`${path}/package.json`)).true

    execSync(`rm -rf ${path}`)
  })
})