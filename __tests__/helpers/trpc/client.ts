import { createTRPCClient } from '@trpc/client';
import { AppRouter } from '@server/routers/app';
import { TRPC } from '../constants';

export const client = createTRPCClient<AppRouter>({
    url: `http://127.0.0.1:${TRPC.PORT}`
});