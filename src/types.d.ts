declare module 'pacote' {
  function extract(name: string, dest: string): Promise<any>
}

declare module 'download-git-repo' {
  export type Config = {
    clone: boolean
  }

  export default function download(
    url: string,
    dest: string,
    config: Config,
    fn: (err: Error) => void
  ): void
}
