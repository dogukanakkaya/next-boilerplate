import { promisify } from 'node:util';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from '@server/routers/app';
import { TRPC } from '../constants';

export const start = () => {
    const { server, listen } = createHTTPServer({
        router: appRouter,
        createContext: () => null
    });

    listen(TRPC.PORT);

    return promisify(server.close.bind(server));
};
