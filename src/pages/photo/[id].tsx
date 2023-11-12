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
    <PageLayout title={`${photo.title || "Photo"} · Lorenzo Cestaro`}>
      <AdvancedImage
        alt={photo.alt}
        className="m-auto"
        cldImg={image}
        plugins={[placeholder({ mode: "blur" })]}
      />
    </PageLayout>
  );
};

export default PhotoPage;
