import React from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ImageKitProvider } from "@imagekit/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "../globals.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider enableSystem={false} defaultTheme="light" attribute="class">
      <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </ImageKitProvider>
    </ThemeProvider>
  );
};

export default App;
