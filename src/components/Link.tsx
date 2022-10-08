import React from "react";

import clsx from "clsx";

const styles = {
  link: (active: boolean) =>
    clsx(
      "font-display",
      "md:text-xl",
      active && "border-solid",
      active || "border-dotted",
      "hover:border-solid",
      "border-b-4",
      "border-yellow-400",
      "dark:border-blue-400",
    ),
};

interface LinkProps {
  href?: string;
  active?: boolean;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, active = false, children }) => (
  <a className={styles.link(active)} href={href}>
    {children}
  </a>
);

export default Link;
