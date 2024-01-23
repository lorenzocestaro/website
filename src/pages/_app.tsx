import "regenerator-runtime/runtime"; // Needed for imagekitio-reac
import React from "react";

import { IKContext } from "imagekitio-react";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "tailwindcss/tailwind.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider enableSystem={false} defaultTheme="light" attribute="class">
      <IKContext urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}>
        <Component {...pageProps} />
      </IKContext>
    </ThemeProvider>
  );
};

export default App;
