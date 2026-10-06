import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PageLayout } from "src/components";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import {
  listCollectionIds,
  listPhotos,
  pickCover,
  SITE_SHARE_IMAGE_URL,
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
}> = async () => {
  const collections = await Promise.all(
    (await listCollectionIds()).map(async (id) => {
      const cover = pickCover(await listPhotos(`collections/${id}`));
      return {
        id,
        displayName: toCollectionName(id),
        coverUrl: cover.url,
        coverWidth: cover.width,
        coverHeight: cover.height,
      };
    }),
  );

  return {
    props: { collections },
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
> = ({ collections }) => (
  <PageLayout
    title="Photography · Lorenzo Cestaro"
    description="Photo collections from my travels, mostly landscape and film."
    shareImageUrl={SITE_SHARE_IMAGE_URL}
  >
    <div className={styles.container}>
      <div className={styles.grid}>
        {collections.map((collection) => (
          <div key={collection.id} className={styles.gridItem}>
            <Link
              href={`/photography/${collection.id}`}
              className={styles.collectionLink}
            >
              <div className={styles.collectionCoverContainer}>
                <Image
                  className={styles.collectionCoverImage}
                  alt={collection.displayName}
                  height={collection.coverHeight}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={collection.coverUrl}
                  title={collection.displayName}
                  width={collection.coverWidth}
                />
              </div>
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
