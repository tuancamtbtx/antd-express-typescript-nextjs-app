
import Document, { Html, DocumentContext, Main, NextScript, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document<any> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        const sheet = new ServerStyleSheet()
        const page = ctx.renderPage(App => props =>
            sheet.collectStyles(<App {...props} />)
        )
        const styleTags = sheet.getStyleElement()
        return { ...initialProps, ...page, styleTags }
    }
    render() {
        return (
            <Html>
                <Head>
                    <link rel='shortcut icon' href='https://image.freepik.com/free-vector/wolf-logo-icon_9880-24.jpg' />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
