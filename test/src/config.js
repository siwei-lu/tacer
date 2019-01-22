import { version } from '../../src/config'
const pkg = require('../../package.json')

describe('Config: version', () => {
  it('should return version in package.json', () => {
    pkg.version.should.eq(version())
  })
})