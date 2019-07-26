import Template from '~/models/Template'
import { expect } from 'chai'
import { pathExists, remove } from 'fs-extra'

describe('Template.create()', () => {
  describe('given an existing template name', () => {
    it('should download the template and return a Template object', async () => {
      const template = await Template.create('react')
      template.name.should.eq('tacer-template-react')

      expect(await pathExists(template.file)).true
      await remove(template.path)
    }).timeout(20000)
  })

  describe('given a not-existing-package', () => {
    it('should throw an error', () => {
      expect(() => Template.create('not-existing-package')).throw
    })
  })

  describe('given a URL of git repo', () => {
    it('should download the repo and return the path of the template.zip', async () => {
      const template = await Template.create(
        'https://github.com/IdanLoo/tacer-template-koa'
      )
      template.name.should.eq('tacer-template-koa')
      expect(await pathExists(template.file)).true
      await remove(template.path)
    }).timeout(20000)
  })
})
