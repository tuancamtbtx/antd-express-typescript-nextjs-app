import React from 'react';
import Head from 'next/head';
import { Result, Button } from 'antd';
import dynamic from 'next/dynamic';
const AppLayout = dynamic(() => import('src/components/layout'), { ssr: false });

const NotFoundPage: React.FC = () => {
    return (
        <AppLayout title="Page Not Found" >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </AppLayout>);

}
export default NotFoundPage;
