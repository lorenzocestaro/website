import React from "react";

import clsx from "clsx";
import Document, { Html, Head, Main, NextScript } from "next/document";

const styles = {
  body: clsx(
    "bg-gray-50",
    "dark:bg-gray-900",
    "dark:text-gray-300",
    "duration-500",
    "text-gray-700",
    "transition-colors",
  ),
};

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://ik.imagekit.io" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
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
