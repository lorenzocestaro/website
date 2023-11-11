import React from "react";

import clsx from "clsx";
import PhotoAlbum, { type Photo } from "react-photo-album";

import { CloudinaryImage } from "src/components/CloudinaryImage";
import { CloudinaryPhoto } from "src/types";

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

const styles = {
  galleryContainer: clsx("px-10", "w-full"),
};

const cloudinaryPhotoToGalleryPhoto = (photo: CloudinaryPhoto): Photo => ({
  src: photo.public_id,
  width: photo.width,
  height: photo.height,
  alt: photo?.context?.custom?.alt ?? "",
  title: photo?.context?.custom?.caption ?? "",
});

export type GalleryProps = {
  photos: CloudinaryPhoto[];
};

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  return (
    <div className={styles.galleryContainer}>
      <PhotoAlbum
        columns={getColumns}
        defaultContainerWidth={1200}
        layout="columns"
        photos={photos.map(cloudinaryPhotoToGalleryPhoto)}
        renderPhoto={CloudinaryImage}
        spacing={getSpacing}
      />
    </div>
  );
};
