import React from "react";

import ImageKit from "@imagekit/nodejs";
import shuffle from "lodash.shuffle";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { type Photo } from "react-photo-album";

import { Gallery, PageLayout } from "src/components";
import {
  isPhotoFile,
  pickCover,
  toPhoto,
  toShareImageUrl,
} from "src/lib/imagekit";

export const getStaticProps = (async () => {
  const imagekit = new ImageKit();

  const resources = await imagekit.assets.list({
    path: "homepage",
    type: "file",
  });

  const files = resources.filter(isPhotoFile);

  return {
    props: {
      shareImageUrl: toShareImageUrl(pickCover(files)),
      photos: shuffle(files.map(toPhoto)),
    },
    revalidate: 60 * 15,
  };
}) satisfies GetStaticProps<{ photos: Photo[]; shareImageUrl: string }>;

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  shareImageUrl,
  photos,
}) => (
  <PageLayout
    title="Home · Lorenzo Cestaro"
    description="Nothing urgent. Photography collection by Lorenzo Cestaro."
    shareImageUrl={shareImageUrl}
  >
    <Gallery photos={photos} />
  </PageLayout>
);

export default HomePage;
