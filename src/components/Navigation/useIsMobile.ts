import React from "react";

const MOBILE_MAX_WIDTH = 700;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(true);

  React.useLayoutEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_MAX_WIDTH);
  }, []);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth < MOBILE_MAX_WIDTH);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return isMobile;
};
