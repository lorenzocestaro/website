import React from "react";

import clsx from "clsx";
import Link from "next/link";
import { ArrowUpRight } from "react-feather";

import { MENU_ITEMS, SOCIAL_LINKS } from "./constants";

const styles = {
  link: clsx("flex", "flex-row", "items-center", "text-xl"),
  menu: clsx("gap-8", "flex", "flex-row", "items-center"),
  menuOption: clsx("align-middle", "font-light", "text-lg"),
};

export const Menu = () => (
  <menu className={styles.menu}>
    {MENU_ITEMS.map(({ href, label, external }) => (
      <ul key={href} className={styles.menuOption}>
        <Link
          className={styles.link}
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
        <Link className={styles.link} href={href} target="_blank">
          {icon}
        </Link>
      </ul>
    ))}
  </menu>
);
