import { objectType, extendType } from '@nexus/schema'
export const User = objectType({
  name: 'User',            
  definition(t) {
    t.string('id')           
    t.string('email')    
    t.string('name')       
    t.string('phone')
    t.list.field('createdByMe', {
        type: 'Workflow',
    })
    t.list.field('assignedToMe', {
        type: 'Workflow',
    })
    t.list.field('reportedToMe', {
        type: 'Workflow',
    })
  },
})


export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
      t.list.field('users', {
        type: 'User',
        resolve(_root, _args, ctx) {
          return ctx.prisma.user.findMany({
            include: {            
              createdByMe: true,
              assignedToMe: true,
              reportedToMe: true,
            }
          })
        },
      });
    },
  });

  // export const UserMutation = extendType({
  //   type: 'Query',
  //   definition(t) {
  //     t.list.field('users', {
  //       type: 'User',
  //       resolve(_root, _args, ctx) {
  //         return ctx.prisma.user.findMany({
  //           include: {            
  //             createdByMe: true,
  //             assignedToMe: true,
  //             reportedToMe: true,
  //           }
  //         })
  //       },
  //     });
  //   },
  // });