import React from "react";

import clsx from "clsx";
import Link from "next/link";

const styles = {
  container: clsx(
    "flex-row",
    "flex",
    "h-28",
    "2xl:h-40",
    "items-center",
    "justify-between",
    "mb-5",
    "w-full",
  ),
  logoType: clsx(
    "font-display",
    "font-medium",
    "grow",
    "2xl:text-3xl",
    "text-2xl",
  ),
};

export type NavBarProps = {
  rightElement: React.ReactNode;
};

export const NavBar: React.FC<NavBarProps> = ({ rightElement }) => {
  return (
    <nav className={styles.container}>
      <Link className={styles.logoType} href="/">
        L O R E N Z O
      </Link>
      {rightElement}
    </nav>
  );
};
