// @flow
import { createInterface } from 'readline'
import type { Readable, Writable } from 'stream';

const _defaultOption = {
  input: process.stdin,
  output: process.stdout,
}

type Option = typeof _defaultOption

export default async function line(
  question: string,
  preset: string = '',
  option: Option = _defaultOption,
): Promise<string> { 
  const rl = createInterface(option)

  if (preset) {
    question += `(${preset}) `
  }

  const answer = await new Promise(
    (res, rej) => rl.question(question, ans => {
      rl.close()
      res(ans)
    })
  ) || preset

  return answer
}