import React from "react";

import clsx from "clsx";
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";

const styles = {
  body: clsx(
    "bg-gray-50",
    "dark:bg-gray-900",
    "text-gray-700",
    "dark:text-gray-300",
    "transition-colors",
    "duration-500",
  ),
};

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
        </Head>
        <body className={styles.body}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
