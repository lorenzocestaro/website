import React from "react";

import clsx from "clsx";
import Link from "next/link";
import { ArrowUpRight } from "react-feather";

import { MENU_ITEMS, SOCIAL_LINKS } from "./constants";

const styles = {
  link: clsx("flex", "flex-row", "items-center", "text-3xl"),
  menu: clsx(
    "flex-col",
    "flex",
    "grow",
    "gap-28",
    "justify-center",
    "items-center",
  ),
  menuItemsContainer: clsx("flex", "flex-col", "gap-8", "items-center"),
  menuOption: clsx("align-middle", "font-light", "text-lg"),
  socialLinksContainer: clsx("flex", "flex-row", "gap-5"),
};

export const OverlayMenu = () => {
  return (
    <menu className={styles.menu}>
      <div className={styles.menuItemsContainer}>
        {MENU_ITEMS.map(({ href, label, external }) => (
          <ul key={href} className={styles.menuOption}>
            <Link
              className={styles.link}
              href={href}
              target={external ? "_blank" : undefined}
            >
              {label}
              {external && <ArrowUpRight size={24} />}
            </Link>
          </ul>
        ))}
      </div>
      <div className={styles.socialLinksContainer}>
        {SOCIAL_LINKS.map(({ href, icon }) => (
          <ul key={href} className={styles.menuOption}>
            <Link href={href} target="_blank">
              {icon}
            </Link>
          </ul>
        ))}
      </div>
    </menu>
  );
};
