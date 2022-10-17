import React from "react";

import clsx from "clsx";

import Link from "src/components/Link";

const styles = {
  h1: clsx("font-light", "text-sm", "sm:text-lg"),
  h2: clsx("mt-3", "text-3xl", "sm:text-5xl", "font-display", "font-extrabold"),
  h3: clsx("text-xl", "sm:text-3xl", "font-display", "font-semibold", "mt-2"),
  p: clsx("mt-3", "sm:mt-6", "sm:leading-normal", "sm:text-xl"),
};

const About = () => (
  <section title="About">
    <h1 className={styles.h1}>Hello, my name is</h1>
    <h2 className={styles.h2}>Lorenzo Cestaro</h2>
    <h3 className={styles.h3}>Best software engineer in my household.</h3>
    <p className={styles.p}>
      I am currently working at{" "}
      <Link href="https://www.klarna.com/careers">Klarna</Link>, where I am
      helping to launch a completely new product search experience in the mobile
      app using <Link href="https://www.reactjs.org/">React</Link>,{" "}
      <Link href="https://www.typescriptlang.org/">Typescript</Link> and{" "}
      <Link href="https://nodejs.org/">Node</Link>.
    </p>
    <p className={styles.p}>
      I am a self-taught software engineer with 5+ years of experience. In my
      career I worked in both backend and frontend teams, I have experience
      across the stack and can add value to engineering teams on multiple
      levels. I am product oriented and enjoy working in cross functional teams,
      where I can independently drive initiatives and features.
    </p>
    <p className={styles.p}>
      Find me on{" "}
      <Link href="https://linkedin.com/in/lorenzocestaro/">LinkedIn</Link> and{" "}
      <Link href="https://github.com/lorenzocestaro/">GitHub</Link>, or send me
      an <Link href="mailto:hi@lorenzocestaro.com">Email</Link>.
    </p>
  </section>
);

export default About;
