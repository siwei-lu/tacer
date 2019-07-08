import program from 'commander'
import main from './main'

program
  .name('tacer')
  .version(process.env.npm_package_version)
  .description(process.env.npm_package_description, {
    template:
      'an npm package name without the prefix "tacer-template" or a git repository url.',
    path: 'where your new project in, defaults to `process.cwd()`.',
  })

program.arguments('<template> [path]').action(main)

export default function run() {
  program.parse(process.argv)

  if (program.args.length === 0) {
    program.help()
  }
}
