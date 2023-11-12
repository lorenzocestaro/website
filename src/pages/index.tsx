import React from "react";

import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { Gallery, PageLayout } from "src/components";
import { Photo } from "src/types";
import { getCollectionUrl } from "src/utils";
import { config } from "src/config";

export const getStaticProps = (async () => {
  const res = await fetch(getCollectionUrl("homepage"));

  const { resources } = await res.json();

  return {
    props: { photos: resources },
    revalidate: config.collectionPageRevalidate,
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
