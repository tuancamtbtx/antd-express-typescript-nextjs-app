import React from 'react';
import LoginContainer from 'src/containers/login'

export default function App() {
    return (
        <div>
            <LoginContainer />
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const headers = req ? req.headers : {};
    console.log(headers)
    return { props: { headers } }
}