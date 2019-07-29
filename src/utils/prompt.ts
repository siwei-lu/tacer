import { createInterface } from 'readline'

export default async function prompt(
  question: string,
  preset = ''
): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  question += ': '
  if (preset) {
    question += `(${preset}) `
  }

  const answer = await new Promise<string>(res =>
    rl.question(question, ans => {
      rl.close()
      res(ans)
    })
  )

  return answer || preset
}
