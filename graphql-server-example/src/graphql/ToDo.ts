import { Prisma } from '@prisma/client';
import { arg, enumType, extendType, inputObjectType, intArg, list, nonNull, objectType, stringArg } from 'nexus';
import { Sort } from './Link';

export const ToDo = objectType({
    name: 'ToDo',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('description');
        t.nonNull.boolean('isCompleted');
        t.nonNull.dateTime("createdAt");
        t.field('createdBy', {
            type: 'User',
            resolve(parent, args, context) {
                return context.prisma.toDo
                    .findUnique({ where: { id: parent.id } })
                    .createdBy();
            },
        });
    },
});

export const ToDoOrderByInput = inputObjectType({
    name: 'ToDoOrderByInput',
    definition(t) {
        t.field('title', { type: Sort });
        t.field('description', { type: Sort });
        t.field('createdAt', { type: Sort });
    },
});


export const ToDoQueryResponse = objectType({
    name: "ToDoQueryResponse",
    definition(t) {
        t.nonNull.list.nonNull.field("list", { type: ToDo });
        t.nonNull.int("count");
        t.id("id");
    },
});


export const ToDoQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('toDos', {
            type: 'ToDoQueryResponse',
            args: {
                filter: stringArg(),
                skip: intArg(),
                take: intArg(),
                orderBy: arg({ type: list(nonNull(ToDoOrderByInput)) }),
            },
            async resolve(parent, args, context) {
                const where = args.filter
                    ? {
                        OR: [
                            { title: { contains: args.filter } },
                            { description: { contains: args.filter } },
                        ],
                    }
                    : {};
                const list = await context.prisma.toDo.findMany({
                    where,
                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined,
                    orderBy: args?.orderBy as
                        | Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput>
                        | undefined,
                });

                const count = await context.prisma.toDo.count({ where });

                const id = `main-feed:${JSON.stringify(args)}`;

                return {
                    list,
                    count,
                    id
                }
            },
        });
    },
});


export const ToDoMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('toDos', {
            type: 'ToDo',
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                const { description, title } = args;
                const { userId } = context;

                if (!userId) {
                    throw new Error('Cannot post without logging in.');
                }

                const newLink = context.prisma.toDo.create({
                    data: {
                        isCompleted: false,
                        title,
                        description,
                        createdBy: { connect: { id: userId } },
                    },
                });

                return newLink;
            },
        });
    },
});