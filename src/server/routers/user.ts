import * as trpc from '@trpc/server';
import { prisma } from '@server/prisma';

export const userRouter = trpc.router()
    .query('first', {
        resolve() {
            return prisma.user.findFirst();
        }
    });