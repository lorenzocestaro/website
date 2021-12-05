import React from "react";

import clsx from "clsx";
import Head from "next/head";

import About from "src/components/About";
import Footer from "src/components/Footer";
import LightSwitch from "src/components/LightSwitch";
import LinkButton from "src/components/LinkButton";

const styles = {
  about: clsx("xl:w-1/2", "xl:mt-0", "mt-12", "mx-auto"),
  button: clsx("xl:m-auto", "mt-16", "mb-8", "mx-auto"),
  container: clsx("flex", "flex-col", "items-center", "justify-between", "min-h-screen"),
  main: clsx("flex", "flex-col", "xl:flex-row", "px-8", "md:px-36", "2xl:px-96", "m-auto"),
};

const Home: React.FC = () => (
  <div className={styles.container}>
    <Head>
      <title>Home · Lorenzo Cestaro </title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>

    <main className={styles.main}>
      <LightSwitch />
      <div className={styles.about}>
        <About />
      </div>
      <LinkButton className={styles.button} title="Resume" href="https://read.cv/lorenzocestaro">
        RESUME
      </LinkButton>
    </main>

    <Footer />
  </div>
);

export default Home;
