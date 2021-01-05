import React from 'react';
export default function App() {
    return (
        <div>User Page</div>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    return { props: { headers } }
}