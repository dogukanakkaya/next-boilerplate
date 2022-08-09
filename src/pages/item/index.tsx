import { type Item as ItemType } from '@prisma/client';
import { trpc } from '@utils/trpc';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from '@components/tables/default';
import Breadcrumb from '@components/breadcrumb';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Item() {
    const { pathname } = useRouter();
    const { data, refetch } = trpc.useQuery(['item.filter', { orderBy: { createdAt: 'desc' } }]);

    const columns = useMemo<ColumnDef<ItemType>[]>(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            accessorFn: row => (
                <div className="relative">
                    <span className="flex absolute h-1.5 w-1.5 -left-4 top-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${row.isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${row.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </span>
                    {row.id}
                </div>
            ),
            cell: info => info.getValue()
        },
        {
            header: 'Name',
            accessorKey: 'name',
            cell: info => info.getValue()
        },
        {
            header: 'Created At',
            accessorKey: 'createdAt',
            cell: info => info.getValue()
        },
        {
            header: 'Updated At',
            accessorKey: 'updatedAt',
            cell: info => info.getValue()
        }
    ], []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Breadcrumb items={[
                {
                    name: 'Dashboard',
                    href: '/'
                },
                {
                    name: 'Item'
                }
            ]} />
            <Table<ItemType>
                {...{
                    data,
                    columns
                }}
            />
            <div className="flex justify-center mt-5">
                <div className="mx-7"><a href="#" className="x-button"><i className="bi bi-info-circle"></i></a></div>
                <div className="mx-7"><a href="#" className="x-button"><i className="bi bi-activity"></i></a></div>
                <div className="mx-7"><button onClick={() => refetch()} className="x-button"><i className="bi bi-arrow-clockwise"></i></button></div>
                <div className="mx-7"><Link href={`${pathname}/create`}><a className="x-button"><i className="bi bi-bookmark-plus"></i></a></Link></div>
            </div>
        </>
    );
}
