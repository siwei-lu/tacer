import { expect } from 'chai'
import { promises as fs, existsSync } from 'fs'
import { execSync } from 'child_process'
import { isDir } from '../../../src/utils/common'
import create, { _handleDir, _handleFile } from '../../../src/utils/create'
import Template from '../../../src/models/Template'

const tpl = new Template({
  template: 'react',
  name: 'test',
  description: 'this is a test description',
  author: 'Idan Loo <im@siwei.lu>',
  repository: 'https://github.com/IdanLoo/ReactCreator.git'
})

describe('Creator util', () => {
  it('should create a project via the template', async () => {
    const path = './.test-create'

    await create(tpl, path)
    expect(await isDir(path)).true
    expect(await isDir(`${path}/src`)).true
    expect(existsSync(`${path}/package.json`)).true

    execSync(`rm -rf ${path}`)
  })
})