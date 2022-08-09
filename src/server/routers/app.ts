import * as trpc from '@trpc/server';
import { z, ZodError } from 'zod';
import { userRouter } from './user';
import { itemRouter } from './item';

export const appRouter = trpc.router()
    .formatError(({ shape, error }) => ({
        ...shape,
        data: {
            ...shape.data,
            validationError:
                error.code === 'BAD_REQUEST' &&
                    error.cause instanceof ZodError
                    ? error.cause.flatten()
                    : null
        }
    }))
    .query('app.health', {
        input: z.object({
            time: z.number()
        }),
        resolve({ input }) {
            const { time } = input;

            if (time < Date.now() - (60 * 60 * 24)) {
                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Date can\'t be in the past more than 24 hours'
                });
            }

            return { status: 'OK', time };
        }
    })
    .merge('user.', userRouter)
    .merge('item.', itemRouter);

export type AppRouter = typeof appRouter;
