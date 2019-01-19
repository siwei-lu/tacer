// @flow
import { createInterface } from 'readline'

const _defaultOption = {
  input: process.stdin,
  output: process.stdout
}

type Option = typeof _defaultOption

export default function line(
  question: string,
  option: Option = _defaultOption
): Promise<string> {
  const rl = createInterface(option)

  return new Promise(
    (res, rej) => rl.question(question, ans => {
      rl.close()
      res(ans)
    })
  )
}