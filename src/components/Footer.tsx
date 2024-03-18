import React from "react";

import clsx from "clsx";

const styles = {
  break: clsx("hidden sm:block"),
  footer: clsx(
    "align-baseline",
    "flex-col",
    "flex",
    "h-20",
    "items-center",
    "justify-center",
    "mb-4",
    "mt-8",
    "shrink-0",
    "sm:flex-row",
    "sm:pb-0",
    "sm:space-y-0",
    "space-x-1",
    "space-y-1",
    "text-gray-400",
    "text-sm",
    "w-full",
  ),
  link: clsx(
    "border-b-2",
    "border-dotted",
    "border-gray-400",
    "cursor:pointer",
    "hover:border-solid",
  ),
};

export const Footer = () => (
  <footer className={styles.footer}>
    <span>
      <p>&copy; 2023 Lorenzo Cestaro · All rights reserved</p>
    </span>
    <span className={styles.break}> · </span>
    <span>
      <a
        className={styles.link}
        href="https://github.com/lorenzocestaro/website"
      >
        Source code
      </a>
    </span>
  </footer>
);
