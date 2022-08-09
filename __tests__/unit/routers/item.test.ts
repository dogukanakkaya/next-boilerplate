import { faker } from '@faker-js/faker';
import { appRouter } from '@server/routers/app';
import { TRPCError } from '@trpc/server';
import { ItemFactory } from '../../factory';

describe('routers.item', () => {
    const caller = appRouter.createCaller({});
    let mockItem: ReturnType<typeof ItemFactory.attributes>;

    beforeEach(() => {
        mockItem = ItemFactory.attributes();
    });

    describe('.filter', () => {
        beforeAll(async () => {
            await Promise.all([...Array(3).keys()].map(() => caller.mutation('item.create', ItemFactory.attributes())));
            await new Promise((resolve) => setTimeout(resolve, 100));
            await Promise.all([...Array(3).keys()].map(() => caller.mutation('item.create', ItemFactory.attributes())));
        });

        test('should return filtered data', async () => {
            const items = await caller.query('item.filter', {
                take: 5,
                orderBy: { createdAt: 'desc' }
            });

            expect(items.length).toBe(5);
            expect(items[0].createdAt.getTime()).toBeGreaterThan(items[items.length - 1].createdAt.getTime());
        });

        test('should return filtered data', async () => {
            const items = await caller.query('item.filter', {
                take: 4,
                orderBy: { createdAt: 'asc' }
            });

            expect(items.length).toBe(4);
            expect(items[0].createdAt.getTime()).toBeLessThan(items[items.length - 1].createdAt.getTime());
        });

        test('should return empty array with non-existing search', async () => {
            const items = await caller.query('item.filter', {
                take: 4,
                q: '---x---y---z---'
            });

            expect(items.length).toBe(0);
            expect(items).toStrictEqual([]);
        });

        test('should return error while validating the data', () => {
            expect(async () => await caller.query('item.filter', {
                q: faker.datatype.string(55)
            })).rejects.toThrow(TRPCError);

            expect(async () => await caller.query('item.filter', {
                take: 0
            })).rejects.toThrow(TRPCError);

            expect(async () => await caller.query('item.filter', {
                // @ts-ignore
                orderBy: { createdAt: 'invalid' }
            })).rejects.toThrow(TRPCError);

            expect(async () => await caller.query('item.filter', {
                // @ts-ignore
                orderBy: { invalidColumn: 'asc' }
            })).rejects.toThrow(TRPCError);
        });
    });

    describe('.findById', () => {
        test('should find created item', async () => {
            const { id } = await caller.mutation('item.create', mockItem);

            const item = await caller.query('item.findById', { id });

            expect(item?.name).toBe(mockItem.name);
            expect(item?.isActive).toBe(mockItem.isActive);
        });

        test('should return null with non-existing id', async () => {
            const item = await caller.query('item.findById', { id: faker.datatype.string() });

            expect(item).toBeNull();
        });
    });

    describe('.create', () => {
        test('should find created item', async () => {
            const { id } = await caller.mutation('item.create', mockItem);

            const item = await caller.query('item.findById', { id });

            expect(item?.name).toBe(mockItem.name);
            expect(item?.isActive).toBe(mockItem.isActive);
        });

        test('should create item', async () => {
            const item = await caller.mutation('item.create', mockItem);

            expect(item?.name).toBe(mockItem.name);
            expect(item?.isActive).toBe(mockItem.isActive);
        });

        test('should return null with non-existing id', async () => {
            const item = await caller.query('item.findById', { id: faker.datatype.string() });

            expect(item).toBeNull();
        });

        test('should return error while validating the data', () => {
            expect(async () => await caller.mutation('item.create', {
                ...mockItem,
                name: faker.datatype.string(1)
            })).rejects.toThrow(TRPCError);

            expect(async () => await caller.mutation('item.create', {
                ...mockItem,
                name: faker.datatype.string(55)
            })).rejects.toThrow(TRPCError);

            expect(async () => await caller.mutation('item.create', {
                ...mockItem,
                // @ts-ignore
                isActive: faker.datatype.string()
            })).rejects.toThrow(TRPCError);
        });
    });
});
