import React from "react";

import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "tailwindcss/tailwind.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider enableSystem={false} defaultTheme="dark" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
