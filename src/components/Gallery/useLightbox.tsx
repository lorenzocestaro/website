import React from "react";

export const useLightbox = () => {
  const [lightboxIndex, setLightboxIndex] = React.useState(-1);
  const [viewportWidth, setViewportWidth] = React.useState<number>();

  React.useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();

    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  return {
    lightboxIndex,
    openLightbox: ({ index }: { index: number }) => {
      if (viewportWidth && viewportWidth > 500) {
        setLightboxIndex(index);
      }
    },
    closeLightbox: () => {
      setLightboxIndex(-1);
    },
  };
};
