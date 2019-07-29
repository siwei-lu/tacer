import Template from '~/models/Template'
import { pathExists, remove } from 'fs-extra'

describe('Template.create()', () => {
  test('given a repo url, it should clone the repo and return the path', async () => {
    jest.setTimeout(10000)

    const repo = 'https://github.com/IdanLoo/tacer-template-koa'
    const template = await Template.create(repo)

    expect(template.name).toBe('tacer-template-koa')
    expect(await pathExists(template.path)).toBeTruthy()
    await remove(template.path)
  })

  test('given a template name, it should extract the package and return the path', async () => {
    jest.setTimeout(10000)

    const template = await Template.create('koa')
    expect(template.name).toBe('tacer-template-koa')
    expect(await pathExists(template.path)).toBeTruthy()
    await remove(template.path)
  })
})
