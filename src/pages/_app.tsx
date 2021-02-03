import React from 'react';
import Head from 'next/head';
import ErrorPage from 'src/components/error'
import { Provider } from 'mobx-react'
import { initializeStores } from 'src/stores'
import { setGlobalAuthToken, setGlobalHeaders } from 'src/utils/axios'
import { createGlobalStyle } from 'styled-components'
import { getToken } from 'src/utils/auth'
import App from 'next/app'
import "src/styles/antd.css";
import 'src/assets/style.scss'
import color from 'src/theme/color'
import Color from 'color'
import type { AppProps, AppContext } from 'next/app'
import { ServerResponse } from 'http';
interface IProps extends AppProps {
    initialMobxStores?: any
}


const NProgressColor = Color(color.SHAPE.PRIMARY).lighten(0.3).toString()

const GlobalStyle = createGlobalStyle`
  #nprogress .bar {
    background: ${NProgressColor};
  }
  #nprogress .peg {
    box-shadow: 0 0 10px ${NProgressColor}, 0 0 5px ${NProgressColor};
  }
  #nprogress .spinner-icon {
    border-top-color: ${NProgressColor};
    border-left-color: ${NProgressColor};
  }
`
interface Context extends AppContext {
    mobxStores: any,
    isAuthenticated: boolean,
    ctx: any,
    res: ServerResponse
}


const MyApp = ({ Component, pageProps, initialMobxStores }: IProps) => {
    const isServer: boolean = typeof window === 'undefined'
    let mobxStores: any = isServer ? initialMobxStores : initializeStores(initialMobxStores)
    if (pageProps.statusCode) {
        return <ErrorPage statusCode={pageProps.statusCode} />
    }
    return (
        <Provider {...mobxStores}>
            <GlobalStyle />
            <Component {...pageProps} />
        </Provider>
    )
}
MyApp.getInitialProps = async (appContext: Context) => {
    const mobxStores = initializeStores()
    appContext.ctx.mobxStores = mobxStores
    const isAuthenticated: boolean = true
    appContext.ctx.isAuthenticated = isAuthenticated
    if (!process.browser) {
        const { host, ...headers } = appContext.ctx.req.headers
        setGlobalHeaders({ headers, origin: host })
    }
    if (!process.browser && !isAuthenticated) {
        const authToken = getToken(appContext.ctx.req)
        if (authToken) {
            setGlobalAuthToken(authToken)
            // await mobxStores.authStore.fetchMe(authToken)
        }
    }
    appContext.ctx.mobxStores = mobxStores
    // appContext.ctx.isAuthenticated = mobxStores.authStore.isAuthenticated
    let appProps: any = {}
    if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext)
    }
    if (appProps.statusCode && appContext.res) {
        appContext.res.statusCode = appProps.statusCode
    }
    return {
        ...appProps,
        initialMobxStores: mobxStores
    }
}
export default MyApp