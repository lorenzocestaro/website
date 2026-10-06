import React from "react";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "react-feather";
import Image from "next/image";
import {
  ColumnsPhotoAlbum,
  computeColumnsLayout,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";

import type { GalleryPhoto } from "src/lib/imagekit";
import imagekitLoader from "src/lib/imagekitLoader";

import { useLightbox } from "./useLightbox";

import "react-photo-album/columns.css";
import "yet-another-react-lightbox/styles.css";

const getColumns = (width: number) => {
  if (width < 500) {
    return 1;
  }

  if (width < 1000) {
    return 2;
  }

  if (width < 2000) {
    return 3;
  }

  return 4;
};

const getSpacing = (width: number) => {
  if (width < 500) {
    return 10;
  }

  if (width < 1000) {
    return 15;
  }

  return 20;
};

const DEFAULT_CONTAINER_WIDTH = 1200;

// Each column holds a run of consecutive photos, so the top row is the first
// photo of each column. Mirrors the album's own layout for this width.
const getFirstRowIndices = (photos: GalleryPhoto[], containerWidth: number) =>
  new Set(
    computeColumnsLayout(
      photos,
      getSpacing(containerWidth),
      0,
      containerWidth,
      getColumns(containerWidth),
    )?.tracks.map((track) => track.photos[0].index),
  );

const renderImage = (
  {
    alt = "",
    title,
    sizes,
    className,
    style,
    loading,
    fetchPriority,
  }: RenderImageProps,
  { photo }: RenderImageContext<GalleryPhoto>,
) => (
  <Image
    alt={alt}
    className={className}
    fetchPriority={fetchPriority}
    height={photo.height}
    loading={loading}
    placeholder={photo.placeholder ?? "empty"}
    sizes={sizes}
    src={photo.src}
    style={style}
    title={title}
    width={photo.width}
  />
);

// Album width: full viewport minus the PageLayout side padding (px-6, lg:px-14).
const albumSizes = {
  size: "calc(100vw - 112px)",
  sizes: [{ viewport: "(max-width: 1023px)", size: "calc(100vw - 48px)" }],
};

const styles = {
  galleryContainer: clsx("w-full"),
};

// Caps what the lightbox loads; the zoom plugin rarely needs more than 2400px.
const LIGHTBOX_WIDTHS = [1080, 1920, 2400];

const toSlide = (photo: GalleryPhoto) => {
  const widths = [
    ...new Set(LIGHTBOX_WIDTHS.map((width) => Math.min(width, photo.width))),
  ];
  const srcSet = widths.map((width) => ({
    src: imagekitLoader({ src: photo.src, width }),
    width,
    height: Math.round((width * photo.height) / photo.width),
  }));

  return { ...srcSet[srcSet.length - 1], srcSet };
};

export type GalleryProps = {
  photos: GalleryPhoto[];
};

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const { closeLightbox, lightboxIndex, openLightbox } = useLightbox();
  const slides = React.useMemo(() => photos.map(toSlide), [photos]);

  return (
    <div className={styles.galleryContainer}>
      <ColumnsPhotoAlbum
        columns={getColumns}
        componentsProps={(containerWidth = DEFAULT_CONTAINER_WIDTH) => {
          const firstRow = getFirstRowIndices(photos, containerWidth);
          return {
            button: { style: { cursor: "zoom-in" } },
            image: ({ index }) =>
              firstRow.has(index)
                ? { loading: "eager", fetchPriority: "high" }
                : undefined,
          };
        }}
        defaultContainerWidth={DEFAULT_CONTAINER_WIDTH}
        onClick={openLightbox}
        photos={photos}
        render={{ image: renderImage }}
        sizes={albumSizes}
        spacing={getSpacing}
      />
      <Lightbox
        close={closeLightbox}
        controller={{ closeOnBackdropClick: true }}
        index={lightboxIndex}
        open={lightboxIndex > -1}
        plugins={[Zoom]}
        render={{
          iconPrev: () => <ChevronLeft size={20} />,
          iconNext: () => <ChevronRight size={20} />,
          iconClose: () => <X size={20} />,
          iconZoomIn: () => <ZoomIn size={20} />,
          iconZoomOut: () => <ZoomOut size={20} />,
        }}
        slides={slides}
        styles={{
          button: { filter: "none" },
          container: { backgroundColor: "rgb(0, 0, 0, 0.8)" },
          navigationNext: { filter: "none" },
          navigationPrev: { filter: "none" },
        }}
      />
    </div>
  );
};
