import execCommand from '~/utils/execCommand'

describe('execCommand()', () => {
  test('given a correct command, it should execute it', async () => {
    await execCommand('ls')
  })

  test('given a wrong command, it should throw an error', () => {
    expect(() => execCommand('fdhjk1h23g21khlcd')).rejects
  })
})
