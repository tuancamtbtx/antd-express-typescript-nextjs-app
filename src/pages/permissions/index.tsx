import React from 'react';
import { Card } from 'antd'
import PermissionContainer from 'src/containers/permission'
import dynamic from 'next/dynamic';
const AppLayout = dynamic(() => import('src/components/layout'), { ssr: false });

export default function App() {
    return (
        <AppLayout title={"Permissions"} activeMenuKey="/permissions">
            <Card>
                <PermissionContainer />
            </Card>
        </AppLayout>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}