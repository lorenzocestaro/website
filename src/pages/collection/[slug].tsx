import React from "react";

import ImageKit from "imagekit";
import shuffle from "lodash.shuffle";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { type Photo } from "react-photo-album";

import { Gallery, PageLayout } from "src/components";

const COLLECTIONS = {
  berlin: { slug: "berlin", title: "BERLIN" },
};

export const getStaticPaths = (async () => {
  return {
    paths: Object.values(COLLECTIONS).map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL as string,
  });

  const slug = params?.slug as keyof typeof COLLECTIONS;

  const resources = await imagekit.listFiles({ path: slug });

  return {
    props: {
      title: COLLECTIONS[slug].title,
      photos: shuffle(
        resources.map((resource) => ({
          key: resource.fileId,
          src: resource.url,
          width: resource.width,
          height: resource.height,
          title: String(resource.customMetadata?.title),
        })),
      ),
    },
    revalidate: 60 * 5,
  };
}) satisfies GetStaticProps<{ title: string; photos: Photo[] }>;

const CollectionPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, photos }) => (
  <PageLayout title={`${title} · Lorenzo Cestaro`}>
    <Gallery title={title} photos={photos} />
  </PageLayout>
);

export default CollectionPage;
