import React from "react";
import ImageKit from "@imagekit/nodejs";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PageLayout } from "src/components";
import Link from "next/link";
import clsx from "clsx";
import { Image } from "@imagekit/react";
import {
  getShareImageUrl,
  isNamedFolder,
  pickCover,
  toCollectionName,
} from "src/lib/imagekit";

export type Collection = {
  id: string;
  displayName: string;
  coverUrl: string;
  coverWidth: number;
  coverHeight: number;
};

export const getStaticProps: GetStaticProps<{
  collections: Collection[];
  shareImageUrl: string;
}> = async () => {
  const imagekit = new ImageKit();

  // List all subfolders in the 'galleries' folder
  const folders = await imagekit.assets.list({
    path: "collections",
    type: "folder",
  });

  // For each folder, get the first image as cover and count items
  const collections: Collection[] = await Promise.all(
    folders.filter(isNamedFolder).map(async ({ name, folderPath }) => {
      const files = await imagekit.assets.list({
        path: folderPath,
        type: "file",
      });
      const cover = pickCover(files);
      return {
        id: name,
        displayName: toCollectionName(name),
        coverUrl: cover?.url ?? "",
        coverWidth: cover?.width ?? 600,
        coverHeight: cover?.height ?? 320,
      };
    }),
  );

  return {
    props: { collections, shareImageUrl: await getShareImageUrl("homepage") },
    revalidate: 60 * 5,
  };
};

const styles = {
  container: clsx("grow"),
  grid: clsx("grid", "grid-cols-1", "gap-4", "md:grid-cols-2", "xl:gap-16"),
  gridItem: clsx("flex", "flex-col", "items-start"),
  collectionLink: clsx(
    "group",
    "block",
    "overflow-hidden",
    "transition-transform",
    "duration-150",
    "active:scale-[0.97]",
  ),
  collectionCoverContainer: clsx("w-full", "overflow-hidden"),
  collectionCoverImage: clsx(
    "aspect-[3/2]",
    "w-full",
    "object-cover",
    "group-hover:scale-105",
    "transition-transform",
  ),
  collectionTitle: clsx("font-display", "text-xl", "font-light", "py-4"),
};

const PhotographyCollectionsPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ collections, shareImageUrl }) => (
  <PageLayout
    title="Photography · Lorenzo Cestaro"
    description="Photo collections from my travels, mostly landscape and film."
    shareImageUrl={shareImageUrl}
  >
    <div className={styles.container}>
      <div className={styles.grid}>
        {collections.map((collection) => (
          <div key={collection.id} className={styles.gridItem}>
            <Link
              href={`/photography/${collection.id}`}
              className={styles.collectionLink}
            >
              {collection.coverUrl && (
                <div className={styles.collectionCoverContainer}>
                  <Image
                    className={styles.collectionCoverImage}
                    alt={collection.displayName}
                    height={collection.coverHeight}
                    loading="lazy"
                    responsive={false}
                    src={collection.coverUrl}
                    title={collection.displayName}
                    width={collection.coverWidth}
                  />
                </div>
              )}
              <h2 className={styles.collectionTitle}>
                {collection.displayName}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default PhotographyCollectionsPage;
