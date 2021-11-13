import React from "react";

import clsx from "clsx";

const styles = {
  link: (active: boolean) =>
    clsx(
      "font-display",
      "border-yellow-400",
      "border-b-4",
      "text-gray-700",
      active || "border-dotted",
      active && "border-solid",
      "hover:border-solid",
      "md:text-xl",
    ),
};

interface LinkProps {
  href?: string;
  active?: boolean;
}

const Link: React.FC<LinkProps> = ({ href, active = false, children }) => (
  <a className={styles.link(active)} href={href}>
    {children}
  </a>
);

export default Link;
