import React from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ImageKitProvider } from "@imagekit/react";
import clsx from "clsx";
import { AppProps } from "next/app";
import { Noto_Sans, Urbanist } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "../globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-noto-sans",
});

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

const styles = {
  fonts: clsx(notoSans.variable, urbanist.variable, "font-sans"),
};

const isProduction = process.env.NODE_ENV === "production";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider enableSystem={false} defaultTheme="light" attribute="class">
      <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}>
        <div className={styles.fonts}>
          <Component {...pageProps} />
        </div>
        {isProduction ? <Analytics /> : null}
        {isProduction ? <SpeedInsights /> : null}
      </ImageKitProvider>
    </ThemeProvider>
  );
};

export default App;
