import '../globals.css';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from './api/trpc/[trpc]';
import Layout from '@components/layouts/default';

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <SessionProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
};

export default withTRPC<AppRouter>({
    config() {
        const url = 'http://localhost:3000/api/trpc';

        return {
            url
        };
    }
})(MyApp);
