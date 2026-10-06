import React from "react";

import shuffle from "lodash.shuffle";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { type Photo } from "react-photo-album";

import { Gallery, PageLayout } from "src/components";
import { listPhotos, SITE_SHARE_IMAGE_URL, toPhoto } from "src/lib/imagekit";

export const getStaticProps = (async () => {
  const files = await listPhotos("homepage");

  return {
    props: { photos: shuffle(files.map(toPhoto)) },
    revalidate: 60 * 15,
  };
}) satisfies GetStaticProps<{ photos: Photo[] }>;

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  photos,
}) => (
  <PageLayout
    title="Home · Lorenzo Cestaro"
    description="Nothing urgent. Photography collection by Lorenzo Cestaro."
    shareImageUrl={SITE_SHARE_IMAGE_URL}
  >
    <Gallery photos={photos} />
  </PageLayout>
);

export default HomePage;
