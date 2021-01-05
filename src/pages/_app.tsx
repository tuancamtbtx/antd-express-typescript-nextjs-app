import React from 'react';
import Head from 'next/head';
// import 'assets/style.scss'
// import dynamic from 'next/dynamic';
// const AppLayout = dynamic(() => import('../components/layout'), { ssr: false });

interface IProps {
    Component: any,
    pageProps: any
}

const App: React.FC<IProps> = ({ Component, pageProps }) => {
    return (
        <div>
            <Head>
                <title>ZMD WEB</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </div>
    )
}
export default App