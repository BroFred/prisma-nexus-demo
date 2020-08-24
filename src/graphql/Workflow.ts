import { objectType, extendType, enumType, stringArg, arg } from '@nexus/schema'

const connectIfNotNull = (fieldName: string) => (v: string ) => v ? {connect:{[fieldName]: v}} : undefined;
const connectWithId = connectIfNotNull('id');

export const WorkflowState = enumType({
    name: 'WorkflowState',
    members: ['todo', 'inprogress', 'done','closed'],
})
export const WorkflowType = enumType({
    name: 'WorkflowType',
    members: ['sequential', 'parallel'],
})

export const Workflow = objectType({
    name: 'Workflow',            
    definition(t) {
        t.string('id')    
        t.string('name')              
        t.field('type', {
            type: WorkflowType
        }),
        t.field('state', {
            type: WorkflowState
        }),
        t.field('previous', {
            type: Workflow,
        })
        t.field('next', {
            type: Workflow
        })
        t.field('parent', {
            type: Workflow,
        })
        t.list.field('children', {
            type: Workflow,
        })
        t.field('assignee', {
            type: 'User',
        })
        t.field('creator', {
            type: 'User',
        })
        t.field('reportor', {
            type: 'User',
        })
    },
  })
  
  
  
export const WorkflowQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('workflows', {
            type: 'Workflow',
            resolve(_root, _args, ctx) {
                return ctx.prisma.workflow.findMany({
                    include: {
                        next: true,
                        parent: true,
                        children: true,
                        previous: true,

                        creator: true,
                        assignee: true,
                        reportor: true
                    }
                })
            },
        });
    },
});

export const WorkflowMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('removeWorkflowById', {
            type: 'Workflow',
            args: {
                id: stringArg({required: true })
            },
            resolve(_root, _args, ctx) {
                return ctx.prisma.workflow.delete({
                    where: { id: _args.id },
                })
            },
        });
        t.field('addWorkWithContext', {
            type: 'Workflow',
            args: {
                parent: stringArg(),
                previous:stringArg(),
                nextId: stringArg(),
                creator: stringArg(),
                name: stringArg({required: true}),
            },
            resolve(_root, _args, ctx) {
                const { parent, previous, next, name, creator } = _args;
                return ctx.prisma.workflow.create({
                    data: {
                            name,
                            parent:connectWithId(parent),
                            creator:connectWithId(creator),
                            next:connectWithId(next),
                            previous:connectWithId(previous),
                        },
                    include:{
                        creator: true
                    }
                })
            },
        })
    }
});

