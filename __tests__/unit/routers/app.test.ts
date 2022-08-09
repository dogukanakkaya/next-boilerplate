import { appRouter } from '@server/routers/app';

describe('routers.app', () => {
    const caller = appRouter.createCaller({});

    describe('.health', () => {
        test('should return status OK', async () => {
            const { status } = await caller.query('app.health', { time: Date.now() });

            expect(status).toBe('OK');
        });
    });
});
