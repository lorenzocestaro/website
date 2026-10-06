import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Gallery as PhotoGallery, PageLayout } from "src/components";
import { type Photo } from "react-photo-album";
import {
  listCollectionIds,
  listPhotos,
  pickCover,
  toCollectionName,
  toPhoto,
  toShareImageUrl,
} from "src/lib/imagekit";
import clsx from "clsx";
import shuffle from "lodash.shuffle";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await listCollectionIds()).map((collectionId) => ({
    params: { collectionId },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{
  collectionName: string;
  shareImageUrl: string;
  photos: Photo[];
}> = async (context) => {
  const collectionId = context.params?.collectionId as string;
  const files = await listPhotos(`collections/${collectionId}`);

  return {
    props: {
      photos: shuffle(files.map(toPhoto)),
      shareImageUrl: toShareImageUrl(pickCover(files)),
      collectionName: toCollectionName(collectionId),
    },
    revalidate: 60 * 15,
  };
};

const styles = {
  headerContainer: clsx(
    "w-full",
    "flex",
    "flex-row",
    "gap-4",
    "pt-2",
    "pb-4",
    "md:pb-8",
  ),
  title: clsx("text-3xl", "font-light", "font-display"),
};

const GalleryPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  collectionName,
  shareImageUrl,
  photos,
}) => (
  <PageLayout
    title={collectionName + " · Lorenzo Cestaro"}
    description={`Photographs from ${collectionName}.`}
    shareImageUrl={shareImageUrl}
  >
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>{collectionName}</h1>
    </div>
    <PhotoGallery photos={photos} />
  </PageLayout>
);

export default GalleryPage;
