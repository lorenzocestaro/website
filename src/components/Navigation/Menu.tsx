import React from "react";

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "react-feather";

import { MENU_ITEMS, SOCIAL_LINKS } from "./constants";

const styles = {
  link: (isActive?: boolean) =>
    clsx(
      "border-b",
      "flex-row",
      "flex",
      "items-center",
      "pb-1",
      "text-xl",
      isActive ? "border-gray-900" : "border-transparent",
    ),
  menu: clsx("gap-8", "flex", "flex-row", "items-center"),
  menuOption: clsx("align-middle", "font-light", "text-lg"),
};

export const Menu = () => {
  const { pathname } = useRouter();

  return (
    <menu className={styles.menu}>
      {MENU_ITEMS.map(({ href, label, external }) => (
        <ul key={href} className={styles.menuOption}>
          <Link
            className={styles.link(pathname === href)}
            href={href}
            target={external ? "_blank" : undefined}
          >
            {label}
            {external && <ArrowUpRight size={20} />}
          </Link>
        </ul>
      ))}
      {SOCIAL_LINKS.map(({ href, icon }) => (
        <ul key={href} className={styles.menuOption}>
          <Link className={styles.link()} href={href} target="_blank">
            {icon}
          </Link>
        </ul>
      ))}
    </menu>
  );
};
