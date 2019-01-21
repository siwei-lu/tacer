import Template from '../../../src/models/Template'

const path = './templates/react/package.json.tpl'
const tpl = new Template({
  name: 'test',
  description: 'this is a test description',
  author: 'Idan Loo <im@siwei.lu>',
})

describe('Template model', () => {
  it('should render template with data', async () => {
    const content = await tpl.render(path)
    const json = JSON.parse(content)
    const keys = Object.keys(tpl)

    if (!keys.every(k => tpl[k].should.eq(json[k]))) {
      throw new Error('render failure')
    }
  })
})