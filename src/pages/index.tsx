import React from "react";

import clsx from "clsx";
import Head from "next/head";

import About from "src/components/About";
import Button from "src/components/Button";
import Footer from "src/components/Footer";
import LightSwitch from "src/components/LightSwitch";

const styles = {
  about: clsx("xl:w-1/2", "xl:mt-0", "mt-12", "mx-auto"),
  button: clsx("xl:m-auto", "mt-16", "mb-8", "mx-auto"),
  container: clsx(
    "flex",
    "flex-col",
    "items-center",
    "justify-between",
    "min-h-screen"
  ),
  main: clsx(
    "flex",
    "flex-col",
    "xl:flex-row",
    "px-8",
    "md:px-36",
    "2xl:px-96",
    "m-auto"
  ),
};

const Home: React.FC = () => (
  <div className={styles.container}>
    <Head>
      <title>Home · Lorenzo Cestaro </title>
    </Head>

    <main className={styles.main}>
      <LightSwitch />
      <div className={styles.about}>
        <About />
      </div>
      <Button
        className={styles.button}
        title="Resume"
        href="https://read.cv/lorenzocestaro"
      >
        RESUME
      </Button>
    </main>

    <Footer />
  </div>
);

export default Home;
