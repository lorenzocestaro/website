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
    "text-yellow-800",
    "dark:text-blue-800",
    "bg-yellow-400",
    "hover:bg-yellow-300",
    "border-yellow-600",
    "hover:border-yellow-400",
    "border-b-4",
    "active:border-b-0",
    "rounded",
    "cursor-pointer",
    "dark:bg-blue-400",
    "dark:hover:bg-blue-300",
    "dark:border-blue-600",
    "dark:hover:border-blue-400",
    "transition-colors",
    "duration-500"
  ),
};

interface ButtonProps {
  href?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  href,
  title,
  className,
  children,
}) => (
  <a className={clsx(styles.link, className)} href={href} title={title}>
    {children}
  </a>
);

export default Button;
