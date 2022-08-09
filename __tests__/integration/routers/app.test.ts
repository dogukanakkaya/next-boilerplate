import { TRPCClientError } from '@trpc/client';
import { client } from '../../helpers/trpc/client';
import { start } from '../../helpers/trpc/server';

describe('routers.app', () => {
    let stop: () => Promise<void>;

    beforeAll(() => {
        stop = start();
    });

    afterAll(async () => {
        await stop();
    });

    describe('.health', () => {
        test('should return validationError as null', async () => {
            expect.hasAssertions();

            try {
                await client.query('app.health', { time: 1 });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                expect(err).toBeInstanceOf(TRPCClientError);
                expect(err.data.validationError).toBeNull();
                expect(err.message).toBe('Date can\'t be in the past more than 24 hours');
            }
        });

        test('should return validationError in the correct format', async () => {
            expect.hasAssertions();

            try {
                // @ts-ignore
                await client.query('app.health', { time: 'not a number' });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                expect(err).toBeInstanceOf(TRPCClientError);
                expect(err.data.validationError.fieldErrors.time.length).toBeGreaterThan(0);
                expect(err.data.validationError.fieldErrors.time[0]).toBe('Expected number, received string');
            }
        });
    });
});
