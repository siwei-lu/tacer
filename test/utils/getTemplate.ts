import getTemplate from '~/utils/getTemplate'
import { pathExists } from 'fs-extra'
import { expect } from 'chai'
import clean from '~/utils/clean'

describe('getTemplate()', () => {
  describe('given an existing template name', () => {
    it('should download the tgz file from npmjs and return the path of the template.zip', async () => {
      const path = await getTemplate('react')
      expect(await pathExists(path)).true
      await clean(path)
    }).timeout(20000)
  })

  describe('given a not-existing-package', () => {
    it('should throw an error', () => {
      expect(() => getTemplate('not-existing-package')).throw
    })
  })

  describe('given a URL of git repo', () => {
    it('should download the repo and return the path of the template.zip', async () => {
      const path = await getTemplate(
        'https://github.com/IdanLoo/tacer-template-koa'
      )
      expect(await pathExists(path)).true
      await clean(path)
    }).timeout(20000)
  })
})
