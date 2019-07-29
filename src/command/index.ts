import program from 'commander'
import getInfo from '~/utils/getInfo'
import main from './main'

const info = getInfo()

program
  .name(info.name)
  .version(info.version)
  .description(info.description, {
    template:
      'an npm package name without the prefix "tacer-template" or a git repository url.',
    path: 'where your new project in, defaults to `process.cwd()`.',
  })

program.arguments('<template> [path]').action(main)

export default function command() {
  program.parse(process.argv)

  if (program.args.length === 0) {
    program.help()
  }
}
