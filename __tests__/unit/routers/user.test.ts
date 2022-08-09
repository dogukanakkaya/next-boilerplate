import { appRouter } from '@server/routers/app';

describe('routers.user', () => {
    const caller = appRouter.createCaller({});

    test('should return user', async () => {
        const user = await caller.query('user.first');

        expect(user).toBeDefined();
    });
});
