import React from "react";

import ImageKit from "imagekit";
import shuffle from "lodash.shuffle";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { type Photo } from "react-photo-album";

import { Gallery, PageLayout } from "src/components";
import { FileObject } from "imagekit/dist/libs/interfaces";

export const getStaticProps = (async () => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL as string,
  });

  const resources = await imagekit.listFiles({
    path: "homepage",
    type: "file",
  });

  return {
    props: {
      photos: shuffle(
        resources
          .filter(
            (resource): resource is FileObject => resource.type === "file",
          )
          .map((resource) => ({
            key: resource.fileId,
            src: resource.url,
            width: resource.width,
            height: resource.height,
            title: String(resource.customMetadata?.title),
          })),
      ),
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
