import React from "react";

import clsx from "clsx";

const styles = {
  footer: clsx(
    "flex",
    "flex-col",
    "space-y-1",
    "justify-center",
    "items-center",
    "w-full",
    "h-16",
    "mt-8",
    "text-sm",
    "text-gray-400",
  ),
};

const Footer = () => (
  <footer className={styles.footer}>&copy; {new Date().getFullYear()} Lorenzo Cestaro</footer>
);

export default Footer;
