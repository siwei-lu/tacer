import program from 'commander'
import { pipe } from 'ramda'
import project from './project'

const main = pipe(project, ({ name, version, description }) =>
  program
    .name(name)
    .version(version)
    .description(description)
    .parse(process.argv)
)

export default main
