import React from "react";

import clsx from "clsx";
import { useTheme } from "next-themes";

const styles = {
  container: clsx("absolute", "top-6", "right-6"),
  input: clsx("sr-only"),
  switchContainer: clsx(
    "cursor-pointer",
    "w-14",
    "h-7",
    "flex",
    "items-center",
    "bg-yellow-400",
    "dark:bg-blue-400",
    "rounded",
    "px-1",
    "border-t-2",
    "border-yellow-300",
    "dark:border-blue-700",
  ),
  switch: clsx(
    "bg-gray-50",
    "dark:bg-gray-900",
    "border-b-2",
    "border-yellow-300",
    "dark:border-blue-700",
    "w-5",
    "h-5",
    "rounded",
    "transition-all",
    "duration-500",
    "transform",
    "translate-x-0",
    "dark:translate-x-7",
  ),
};

const LightSwitch: React.FC = () => {
  const { theme, systemTheme, setTheme } = useTheme();
  console.log(systemTheme);
  const currentTheme = theme ?? systemTheme;

  return (
    <div className={styles.container}>
      <label htmlFor="light-switch" className={styles.switchContainer}>
        <input
          id="light-switch"
          type="checkbox"
          className={styles.input}
          defaultChecked={currentTheme === "light"}
          onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
        />
        <div className={styles.switch} />
      </label>
    </div>
  );
};

export default LightSwitch;
