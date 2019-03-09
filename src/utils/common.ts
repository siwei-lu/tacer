import { promises as fs, existsSync } from 'fs'

export type CopyFileCallbackOption = {
  filename: string,
  content: string,
}

export type CopyFileCallback =
  (option: CopyFileCallbackOption) => CopyFileCallbackOption

export const isDir = (path: string) =>
  fs.stat(path).then(s => s.isDirectory())

export async function checkPath(path: string) {
  if (!existsSync(path)) {
    await fs.mkdir(path)
  }
}

export async function copyFile(
  src: string,
  destDir: string,
  filename: string,
  cb?: CopyFileCallback
) {
  let content = await fs.readFile(src, 'utf8')

  if (cb) {
    const result = cb({ filename, content })
    filename = result.filename
    content = result.content
  }

  await fs.writeFile(`${destDir}/${filename}`, content, 'utf8')
}

export async function copyDir(
  src: string,
  dest: string,
  cb?: CopyFileCallback
) {
  const subnames = await fs.readdir(src)
  const promises = subnames.map(async name => {
    const subpath = `${src}/${name}`
    const subdest = `${dest}/${name}`

    if (await isDir(subpath)) {
      return copyDir(subpath, subdest, cb)
    }
    
    await copyFile(subpath, dest, name, cb)
  })

  await checkPath(dest)
  await Promise.all(promises)
}