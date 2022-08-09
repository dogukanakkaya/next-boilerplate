import Breadcrumb from '@components/breadcrumb';
import { useRouter } from 'next/router';
import { type FormEvent, useEffect, useState } from 'react';
import { trpc } from '@utils/trpc';
import ValidationError from '@components/errors/validation-error';

export default function Create() {
    const { pathname } = useRouter();

    const mutation = trpc.useMutation(['item.create']);

    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutation.mutate({ name, isActive });
    };

    useEffect(() => {
        setName('');
        setIsActive(true);
    }, [mutation.isSuccess]);

    return (
        <>
            <Breadcrumb items={[
                {
                    name: 'Dashboard',
                    href: '/'
                },
                {
                    name: 'Item',
                    href: pathname.substring(0, pathname.lastIndexOf('/'))
                },
                {
                    name: 'Create'
                }
            ]} />
            <div className="shadow-lg bg-white dark:bg-gray-900 p-5 rounded">
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder="Enter item name" />
                            <ValidationError field="name" error={mutation.error} />
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <label htmlFor="isActive">Active</label>
                            <select value={isActive ? '1' : '0'} onChange={e => setIsActive(!!parseInt(e.target.value))} name="isActive" id="isActive">
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                            <ValidationError field="isActive" error={mutation.error} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            {
                                mutation.isSuccess ? (
                                    <div className="info-card border-green-400 bg-green-600">Item created successfully!</div>
                                ) : mutation.isLoading ? (
                                    <div className="info-card border-blue-400 bg-blue-600">Please wait...</div>
                                ) : null
                            }
                        </div>
                        <div className={`flex gap-4 ${mutation.isLoading ? 'pointer-events-none' : ''}`}>
                            <button type="reset" className="text-white text-sm font-semibold py-2 px-4 rounded-lg bg-gray-500 hover:bg-gray-700">Reset</button>
                            <button type="submit" className="text-white text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-700">Save <i className="bi bi-save"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
