import React from "react";

import clsx from "clsx";
import Link from "next/link";

const styles = {
  h1: clsx("font-light", "text-sm", "sm:text-lg"),
  h2: clsx("mt-3", "text-3xl", "sm:text-5xl", "font-display", "font-extrabold"),
  h3: clsx("text-xl", "sm:text-3xl", "font-display", "mt-2"),
  link: clsx(
    "border-b-4",
    "border-dotted",
    "border-yellow-400",
    "hover:border-solid",
    "md:text-xl",
  ),
  p: clsx("mt-3", "sm:mt-6", "sm:leading-normal", "sm:text-xl"),
  section: clsx("pb-1", "w-8/12", "xl:w-6/12"),
};

export const About = () => (
  <section title="About" className={styles.section}>
    <h1 className={styles.h1}>Hello, I&apos;m</h1>
    <h2 className={styles.h2}>Lorenzo</h2>
    <h3 className={styles.h3}>Software engineer and hobby photographer.</h3>
    <p className={styles.p}>
      I work as a senior software engineer at{" "}
      <Link className={styles.link} href="https://www.klarna.com/careers">
        Klarna
      </Link>
      , working on the search experience in the mobile app using{" "}
      <Link className={styles.link} href="https://www.reactjs.org/">
        React
      </Link>
      ,{" "}
      <Link className={styles.link} href="https://www.typescriptlang.org/">
        Typescript
      </Link>{" "}
      and{" "}
      <Link className={styles.link} href="https://nodejs.org/">
        Node
      </Link>
      .
    </p>
    <p className={styles.p}>
      I am a self-taught software engineer with 5+ years of experience. In my
      career I collaborated in both backend and frontend teams, I have
      experience across the stack and can add value to engineering teams on
      multiple levels. I am product oriented and enjoy working in cross
      functional teams, where I can independently drive initiatives and
      features.
    </p>
    <p className={styles.p}>
      I like landscape photography and enjoy taking pictures during my travels,
      mainly film. You can find my favorite shots{" "}
      <Link className={styles.link} href="/">
        here
      </Link>
      .
    </p>
  </section>
);
