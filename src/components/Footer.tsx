import React from "react";

import clsx from "clsx";

const styles = {
  break: clsx("hidden sm:block"),
  footer: clsx(
    "flex",
    "flex-col",
    "sm:flex-row",
    "space-y-1",
    "sm:space-y-0",
    "space-x-1",
    "justify-center",
    "items-center",
    "align-baseline",
    "w-full",
    "h-16",
    "mt-8",
    "pb-4",
    "sm:pb-0",
    "text-sm",
    "text-gray-400",
  ),
  link: clsx(
    "border-dotted",
    "border-b-2",
    "border-gray-400",
    "hover:border-solid",
    "cursor:pointer",
  ),
};

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} Lorenzo Cestaro</p>
    <span className={styles.break}> · </span>
    <span>
      <a className={styles.link} href="https://github.com/lorenzocestaro/website">
        Source code
      </a>
      <span> · </span>
      <a className={styles.link} href="https://www.google.com/maps/search/bars+near+me/">
        Buy yourself a beer
      </a>
    </span>
  </footer>
);

export default Footer;
