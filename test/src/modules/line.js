import { Readable, Writable } from 'stream'
import line from '../../../src/modules/line'

const ws = new Writable({
  write(_, __, next) {
    next()
  }
})

describe('Line module', () => {
  it('should ask a question and read a line of input', async () => {
    const input = new Readable({})
    const output = ws
    input.push('Idan Loo\r\n')
    input.push('22\r\n')
    input.push(null)

    const name = await line("What's your name: ", { input, output })
    const age = await line("How old are you: ", { input, output })

    name.should.eq('Idan Loo')
    age.should.eq('22')
  })
})