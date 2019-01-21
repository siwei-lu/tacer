import { Readable, Writable } from 'stream'
import line from '../../../src/utils/line'

const getWs = (output: string[]) =>
  new Writable({
    write(chunk, _, next) {
      output.push(chunk.toString())
      next()
    }
  })

describe('Line module', () => {
  it('should ask a question and read a line of input', async () => {
    const out = []
    const output = getWs(out)
    
    const input = new Readable({})
    input.push('Idan Loo\r\n')
    input.push('22\r\n')
    input.push(null)

    const option = { input, output }
    const name = await line("What's your name: ", 'Idan Loo', option)
    const age = await line("How old are you: ", '22', option)

    out.length.should.eq(2)
    out[0].should.eq("What's your name: (Idan Loo) ")
    out[1].should.eq('How old are you: (22) ')

    name.should.eq('Idan Loo')
    age.should.eq('22')
  })
})