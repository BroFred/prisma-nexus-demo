import { makeSchema } from '@nexus/schema'
import * as User from './User'
import * as Workflow from './Workflow'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'


export default makeSchema({
  types: [ User, Workflow ],
  plugins: [nexusSchemaPrisma()],
})