import template from '~/utils/template'

describe('template()', () => {
  it('should return a new name wrapped with prefix', () => {
    const tplname = template('react')
    tplname.should.eq('tacer-template-react')
  })

  it('should return this argument if the argument is an url', () => {
    const url = 'https://github.com/IdanLoo/tacer-template-bin'
    const tplname = template(url)
    tplname.should.eq(url)
  })
})
