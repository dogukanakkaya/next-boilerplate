import * as trpc from '@trpc/server';
import { prisma } from '@server/prisma';
import { z } from 'zod';

export const itemRouter = trpc.router()
    .query('filter', {
        input: z.object({
            q: z.string().max(50).optional(),
            take: z.number().gt(0).optional(),
            orderBy: z.union([
                z.record(
                    z.enum(['id', 'name', 'createdAt']),
                    z.enum(['asc', 'desc'])
                ),
                z.array(
                    z.record(
                        z.enum(['id', 'name', 'createdAt']),
                        z.enum(['asc', 'desc'])
                    )
                )
            ]).optional()
        }),
        resolve({ input }) {
            const { q, take, orderBy } = input;

            return prisma.item.findMany({
                take,
                orderBy,
                where: {
                    name: {
                        contains: q,
                        mode: 'insensitive'
                    }
                }
            });
        }
    })
    .query('findById', {
        input: z.object({
            id: z.string()
        }),
        resolve({ input }) {
            return prisma.item.findUnique({
                where: {
                    id: input.id
                }
            });
        }
    })
    .mutation('create', {
        input: z.object({
            name: z.string().min(5).max(50),
            isActive: z.boolean().default(true)
        }),
        resolve({ input }) {
            return prisma.item.create({
                data: input
            });
        }
    });