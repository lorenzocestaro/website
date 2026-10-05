import React from "react";

const MOBILE_MAX_WIDTH = 800;

const subscribe = (onChange: () => void) => {
  window.addEventListener("resize", onChange);

  return () => {
    window.removeEventListener("resize", onChange);
  };
};

const getSnapshot = () => window.innerWidth < MOBILE_MAX_WIDTH;

const getServerSnapshot = () => true;

export const useCollapsedMenu = () =>
  React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
