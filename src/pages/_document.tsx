// import { createEnvsFromList } from 'env';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { createEnvsFromList } from 'env';

export default class MyDocument extends Document {
  render(): JSX.Element {
    const scriptEnv = `window.__ENV__ = ${JSON.stringify(createEnvsFromList())}`;
    return (
      <Html lang="vi">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: scriptEnv }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
