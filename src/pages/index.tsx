import React from "react";

import shuffle from "lodash.shuffle";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { Gallery, PageLayout } from "src/components";
import { type GalleryPhoto, listPhotos, toPhoto } from "src/lib/imagekit";

export const getStaticProps = (async () => {
  const files = await listPhotos("homepage");

  return {
    props: { photos: shuffle(await Promise.all(files.map(toPhoto))) },
    revalidate: 60 * 15,
  };
}) satisfies GetStaticProps<{ photos: GalleryPhoto[] }>;

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  photos,
}) => (
  <PageLayout
    title="Home · Lorenzo Cestaro"
    description="Nothing urgent. Photography collection by Lorenzo Cestaro."
  >
    <Gallery photos={photos} />
  </PageLayout>
);

export default HomePage;
