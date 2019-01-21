import { _dirname } from '../../src/utils/command'

describe('Main', () => {
  it('should return the last name of a path', () => {
    const dir = _dirname('/tmp/test/result')
    dir.should.eq('result')
  })
})
