import React from "react";
import ImageKit from "imagekit";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Gallery as PhotoGallery, PageLayout } from "src/components";
import { type Photo } from "react-photo-album";
import { FileObject } from "imagekit/dist/libs/interfaces";
import clsx from "clsx";

export const getStaticPaths: GetStaticPaths = async () => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL as string,
  });

  const folders = await imagekit.listFiles({
    path: "collections",
    type: "folder",
  });

  return {
    paths: folders
      .filter((folder) => folder.type === "folder")
      .map((folder) => ({ params: { collectionId: folder.name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  collectionName: string;
  photos: Photo[];
}> = async (context) => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL as string,
  });

  const collectionId = context.params?.collectionId as string;
  const resources = await imagekit.listFiles({
    path: `collections/${collectionId}`,
  });
  const photos = resources
    .filter(
      (resource): resource is FileObject =>
        resource.type === "file" && resource.isPrivateFile === false,
    )
    .map((resource) => ({
      key: resource.fileId,
      src: resource.url,
      width: resource.width,
      height: resource.height,
      title: String(resource.customMetadata?.title),
    }));

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
