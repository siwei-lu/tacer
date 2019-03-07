import { createInterface } from 'readline'
import { Readable, Writable } from 'stream'

type Option = {
  input: Readable,
  output: Writable,
}

const _defaultOption = {
  input: process.stdin,
  output: process.stdout,
}

export default async function line(
  question: string,
  preset: string = '',
  option: Option = _defaultOption,
): Promise<string> { 
  const rl = createInterface(option)

  if (preset) {
    question += `(${preset}) `
  }

  const answer: string = await new Promise(
    (res, rej) => rl.question(question, ans => {
      rl.close()
      res(ans)
    })
  ) || preset

  return answer
}