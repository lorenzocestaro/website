import React from "react";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "react-feather";
import { IKImage } from "imagekitio-react";
import {
  ColumnsPhotoAlbum,
  RenderPhotoContext,
  RenderPhotoProps,
  type ColumnsPhotoAlbumProps,
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
  { onClick }: RenderPhotoProps,
  { photo }: RenderPhotoContext,
) => {
  return (
    <IKImage
      alt={photo.alt}
      height={photo.height}
      key={photo.key}
      loading="lazy"
      lqip={{ active: true }}
      onClick={onClick}
      src={photo.src}
      style={{ width: "100%", cursor: "zoom-in" }}
      title={photo.title}
      width={photo.width}
    />
  );
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
        defaultContainerWidth={1200}
        onClick={openLightbox}
        photos={photos}
        render={{ photo: renderImage }}
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
