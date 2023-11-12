import React from "react";

import clsx from "clsx";
import Link from "next/link";

import { useIsMobile } from "./useIsMobile";

const styles = {
  container: (isMobile: boolean) =>
    clsx(
      "flex-row",
      "flex",
      "justify-between",
      "pt-8",
      "px-10",
      "w-full",
      isMobile ? "pb-10" : "pb-20",
      isMobile ? undefined : "items-baseline",
    ),
  logoType: clsx(
    "align-middle",
    "font-display",
    "font-regular",
    "grow",
    "mt-2",
    "text-3xl",
  ),
};

export type NavBarProps = {
  rightElement: React.ReactNode;
};

export const NavBar: React.FC<NavBarProps> = ({ rightElement }) => {
  const isMobile = useIsMobile();

  return (
    <nav className={styles.container(isMobile)}>
      <Link className={styles.logoType} href="/">
        L O R E N Z O
      </Link>
      {rightElement}
    </nav>
  );
};
