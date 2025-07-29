import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
       
  <meta name="shopify-api-key" content="9a0b89206045c07c821e340a610" />

        <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
        strategy="beforeInteractive"
        ></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
