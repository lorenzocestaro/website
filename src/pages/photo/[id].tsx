import React from "react";

import { AdvancedImage, placeholder } from "@cloudinary/react";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { v2 as cloudinary } from "cloudinary";
import type { GetServerSideProps } from "next";

import { PageLayout } from "src/components";
import { config } from "src/config";
import { Photo } from "src/types";
import { imageResourceToPhoto } from "src/utils";
import clsx from "clsx";

export const getServerSideProps = (async (context) => {
  context.res.setHeader(
    "Cache-Control",
    `public, s-maxage=${config.photoPageCacheMaxAge}, stale-while-revalidate=${config.photoPageStaleWhileRevalidate}`,
  );

  const imageId = context.query.id;

  if (!imageId) {
    return {
      notFound: true,
    };
  }

  const imageResource = await cloudinary.api.resource(
    context.query.id as string,
  );

  return {
    props: { photo: imageResourceToPhoto(imageResource) },
  };
}) satisfies GetServerSideProps<PhotoPageProps>;

const styles = {
  img: clsx("min-h-0", "object-contain", "xl:px-16", "px-4"),
};

type PhotoPageProps = {
  photo: Photo;
};

const PhotoPage: React.FC<PhotoPageProps> = ({ photo }) => {
  const image = config.cloudinary
    .image(photo.id)
    .quality("auto")
    .resize(scale().width("auto"))
    .delivery(dpr("auto"));

  return (
    <PageLayout title={`${photo.title || "Photo"} · Lorenzo Cestaro`} viewport>
      <AdvancedImage
        alt={photo.alt}
        cldImg={image}
        plugins={[placeholder({ mode: "blur" })]}
        className={styles.img}
      />
    </PageLayout>
  );
};

export default PhotoPage;
