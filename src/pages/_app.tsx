import React, { ReactNode } from "react";
import 'src/styles/antd/antd.less';
import App from 'next/app'

import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />

}
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}
export default MyApp

