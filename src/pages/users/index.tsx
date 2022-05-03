import React from 'react';
import { Card } from 'antd'
import UserContainer from 'src/containers/users'
import AppLayout from 'src/components/layout'
export default function App() {
    return (
        <AppLayout title={"Users"} activeMenuKey="/users">
            <Card>
                <UserContainer />
            </Card>
        </AppLayout>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}