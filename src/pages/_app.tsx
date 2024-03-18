import React from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IKContext } from "imagekitio-react";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "regenerator-runtime/runtime"; // Needed for imagekitio-react
import "tailwindcss/tailwind.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider enableSystem={false} defaultTheme="light" attribute="class">
      <IKContext urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </IKContext>
    </ThemeProvider>
  );
};

export default App;
