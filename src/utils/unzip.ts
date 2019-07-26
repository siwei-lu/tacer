import unzipper from 'unzipper'
import { createReadStream } from 'fs'

export default async function unzip(target: string, dest: string) {
  const rs = createReadStream(target)
  return rs.pipe(unzipper.Extract({ path: dest })).promise()
}
