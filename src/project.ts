import { pipe } from 'ramda'
import { pathInProjectDir } from './utils'

interface Project {
  name: string
  version: string
  description: string
}

type $project = () => Project
const project: $project = pipe(pathInProjectDir('package.json'), require)
export default project
