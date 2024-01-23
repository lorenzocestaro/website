import React from "react";

import clsx from "clsx";
import PhotoAlbum, {
  RenderPhotoProps,
  type PhotoAlbumProps,
} from "react-photo-album";
import { IKImage } from "imagekitio-react";

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
  imageProps: { alt, title, sizes, className },
}: RenderPhotoProps) => {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
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
  return (
    <div className={styles.galleryContainer}>
      <PhotoAlbum
        columns={getColumns}
        defaultContainerWidth={1200}
        layout="columns"
        photos={photos}
        renderPhoto={renderPhoto}
        spacing={getSpacing}
      />
    </div>
  );
};
