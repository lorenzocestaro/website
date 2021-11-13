import React from "react";

import clsx from "clsx";

const styles = {
  link: clsx(
    "font-display",
    "text-xl",
    "md:text-2xl",
    "py-3",
    "md:py-4",
    "px-6",
    "md:px-8",
    "text-gray-700",
    "bg-yellow-400",
    "hover:bg-yellow-300",
    "border-b-4",
    "active:border-b-0",
    "border-yellow-600",
    "hover:border-yellow-400",
    "rounded",
    "cursor-pointer",
  ),
};

interface LinkButtonProps {
  className?: string;
  href?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, children, className }) => (
  <a className={clsx(styles.link, className)} href={href}>
    {children}
  </a>
);

export default LinkButton;
