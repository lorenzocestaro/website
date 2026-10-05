import React from "react";

import ImageKit from "@imagekit/nodejs";
import shuffle from "lodash.shuffle";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { type Photo } from "react-photo-album";

import { Gallery, PageLayout } from "src/components";
import { isPhotoFile, toPhoto } from "src/lib/imagekit";

export const getStaticProps = (async () => {
  const imagekit = new ImageKit();

  const resources = await imagekit.assets.list({
    path: "homepage",
    type: "file",
  });

  return {
    props: {
      photos: shuffle(resources.filter(isPhotoFile).map(toPhoto)),
    },
    revalidate: 60 * 15,
  };
}) satisfies GetStaticProps<{ photos: Photo[] }>;

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  photos,
}) => (
  <PageLayout title="Home · Lorenzo Cestaro">
    <Gallery photos={photos} />
  </PageLayout>
);

export default HomePage;
