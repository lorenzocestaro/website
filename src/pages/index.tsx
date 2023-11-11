import React from "react";

import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { Gallery, PageLayout } from "src/components";
import { CloudinaryPhoto } from "src/types";
import { getCollectionUrl } from "src/utils";

export const getStaticProps = (async () => {
  const res = await fetch(getCollectionUrl("homepage"));

  const { resources: photos } = await res.json();

  return { props: { photos }, revalidate: 60 };
}) satisfies GetStaticProps<{ photos: CloudinaryPhoto[] }>;

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  photos,
}) => (
  <PageLayout title="Home · Lorenzo Cestaro">
    <Gallery photos={photos} />
  </PageLayout>
);

export default HomePage;
