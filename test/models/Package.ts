import Package from '~/models/Package'
import { resolve } from 'path'
import { readFile } from 'fs-extra'

describe('package.writeTo()', () => {
  describe('given a package file', () => {
    it('should write its data into the file', async () => {
      const pkgFile = resolve(__dirname, '../resources/package.json')

      const pkg = new Package({
        name: Math.random().toString(),
        description: Math.random().toString(),
        license: Math.random().toString(),
      })

      await pkg.writeTo(pkgFile)
      const newPkg = JSON.parse(await readFile(pkgFile, 'utf8'))

      pkg.name.should.eq(newPkg.name)
      pkg.description.should.eq(newPkg.description)
      pkg.license.should.eq(newPkg.license)
    })
  })
})
