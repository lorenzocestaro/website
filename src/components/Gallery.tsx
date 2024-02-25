import React from "react";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "react-feather";
import { IKImage } from "imagekitio-react";
import PhotoAlbum, {
  RenderPhotoProps,
  type PhotoAlbumProps,
} from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";

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

const renderPhoto = ({
  photo,
  wrapperStyle,
  imageProps: { alt, title, sizes, className, onClick },
}: RenderPhotoProps) => {
  return (
    <div
      style={{ ...wrapperStyle, position: "relative", cursor: "zoom-in" }}
      onClick={onClick}
    >
      <IKImage
        key={photo.key}
        alt={alt}
        height={photo.height}
        loading="lazy"
        lqip={{ active: true }}
        src={photo.src}
        title={title}
        width={photo.width}
        sizes={sizes}
        className={className}
      />
    </div>
  );
};

const styles = {
  galleryContainer: clsx("w-full"),
};

export type GalleryProps = {
  photos: PhotoAlbumProps["photos"];
};

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = React.useState(-1);

  return (
    <div className={styles.galleryContainer}>
      <PhotoAlbum
        columns={getColumns}
        defaultContainerWidth={1200}
        layout="columns"
        onClick={({ index }) => setLightboxIndex(index)}
        photos={photos}
        renderPhoto={renderPhoto}
        spacing={getSpacing}
      />
      <Lightbox
        close={() => setLightboxIndex(-1)}
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
