// @flow
import { createInterface } from 'readline'
import type { Readable, Writable } from 'stream';

type Option = {
  input?: Readable,
  output?: Writable,
  preset?: string,
}

export default async function line(
  question: string,
  { input = process.stdin, output = process.stdout, preset = '' }: Option = {}
): Promise<string> { 
  const rl = createInterface({ input, output })

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