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
      "text-3xl",
      isActive ? "border-gray-900" : "border-transparent",
    ),
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
  const { pathname } = useRouter();

  return (
    <menu className={styles.menu}>
      <div className={styles.menuItemsContainer}>
        {MENU_ITEMS.map(({ href, label, external }) => (
          <ul key={href} className={styles.menuOption}>
            <Link
              className={styles.link(pathname === href)}
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
