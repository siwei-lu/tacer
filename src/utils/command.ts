import * as commander from 'commander'
import create from './create'
import add from './add'

export default function command() {
  commander
    .arguments('<template> <path>')
    .action(create)

  commander
    .command('add <template-name>')
    .action(add)
  
  commander
    .version('0.3.0')
    .parse(process.argv)
}