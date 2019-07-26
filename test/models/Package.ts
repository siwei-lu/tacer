import Package from '~/models/Package'
import { resolve } from 'path'
import { readFile } from 'fs-extra'
import Template from '~/models/Template'

describe('package.writeTo()', () => {
  describe('given a package file', () => {
    it('should write its data into the file', async () => {
      const pkgFile = resolve(__dirname, '../resources/package.json')
      const template: any = { name: 'tacer-test', tag: '^1.0.0' }

      const pkg = new Package({
        template,
        name: Math.random().toString(),
        description: Math.random().toString(),
        license: Math.random().toString(),
      })

      await pkg.writeTo(pkgFile)
      const newPkg = require(pkgFile)

      pkg.name.should.eq(newPkg.name)
      pkg.description.should.eq(newPkg.description)
      pkg.license.should.eq(newPkg.license)
      newPkg.devDependencies['tacer-test'].should.eq('^1.0.0')
    })
  })
})
