import React from 'react';
import Header from '@components/header';

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            <Header />

            <main className="container mx-5 my-5 sm:mx-auto">{children}</main>
        </>
    );
}