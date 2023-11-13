import React from "react";

const MOBILE_MAX_WIDTH = 800;

export const useCollapsedMenu = () => {
  const [doUseCollapsedMenu, setDoUseCollapsedMenu] = React.useState(true);

  React.useEffect(() => {
    setDoUseCollapsedMenu(window.innerWidth < MOBILE_MAX_WIDTH);
  }, []);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setDoUseCollapsedMenu(window.innerWidth < MOBILE_MAX_WIDTH);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return doUseCollapsedMenu;
};
