import React from "react";
import ImageKit from "@imagekit/nodejs";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Gallery as PhotoGallery, PageLayout } from "src/components";
import { type Photo } from "react-photo-album";
import { isNamedFolder, isPhotoFile, toPhoto } from "src/lib/imagekit";
import clsx from "clsx";
import shuffle from "lodash.shuffle";

export const getStaticPaths: GetStaticPaths = async () => {
  const imagekit = new ImageKit();

  const folders = await imagekit.assets.list({
    path: "collections",
    type: "folder",
  });

  return {
    paths: folders
      .filter(isNamedFolder)
      .map((folder) => ({ params: { collectionId: folder.name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  collectionName: string;
  photos: Photo[];
}> = async (context) => {
  const imagekit = new ImageKit();

  const collectionId = context.params?.collectionId as string;
  const resources = await imagekit.assets.list({
    path: `collections/${collectionId}`,
  });
  const photos = shuffle(
    resources
      .filter(
        (resource): resource is ImageKit.File =>
          resource.type === "file" && resource.isPrivateFile === false,
      )
      .filter(isPhotoFile)
      .map(toPhoto),
  );

  return {
    props: {
      photos,
      collectionName: collectionId
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
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
  title: clsx("text-3xl", "font-thin", "font-display"),
};

const GalleryPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  collectionName,
  photos,
}) => (
  <PageLayout title={collectionName + " · Lorenzo Cestaro"}>
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>{collectionName}</h1>
    </div>
    <PhotoGallery photos={photos} />
  </PageLayout>
);

export default GalleryPage;
