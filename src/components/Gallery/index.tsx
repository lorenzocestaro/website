import React from "react";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "react-feather";
import Image from "next/image";
import {
  ColumnsPhotoAlbum,
  type ColumnsPhotoAlbumProps,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";

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

const renderImage = (
  { alt = "", title, sizes, className, style }: RenderImageProps,
  { photo }: RenderImageContext,
) => (
  <Image
    alt={alt}
    className={className}
    height={photo.height}
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

export type GalleryProps = {
  photos: ColumnsPhotoAlbumProps["photos"];
};

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const { closeLightbox, lightboxIndex, openLightbox } = useLightbox();

  return (
    <div className={styles.galleryContainer}>
      <ColumnsPhotoAlbum
        columns={getColumns}
        componentsProps={{ button: { style: { cursor: "zoom-in" } } }}
        defaultContainerWidth={1200}
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
        slides={photos}
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
