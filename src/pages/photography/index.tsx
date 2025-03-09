import React from "react";
import ImageKit from "imagekit";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PageLayout } from "src/components";
import Link from "next/link";
import clsx from "clsx";
import { IKImage } from "imagekitio-react";

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
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL as string,
  });

  // List all subfolders in the 'galleries' folder
  const folders = await imagekit.listFiles({
    path: "collections",
    type: "folder",
  });

  // For each folder, get the first image as cover and count items
  const collections: Collection[] = await Promise.all(
    folders
      .filter((file) => file.type === "folder")
      .map((folder, index) => {
        if (index === 0) {
          console.log({ folder });
        }
        return folder;
      })
      .map(async (folder) => {
        const items = await imagekit.listFiles({ path: folder.folderPath });
        const cover =
          items.find(
            (file) =>
              file.type === "file" && file.tags && file.tags.includes("cover"),
          ) || items.find((file) => file.type === "file");
        return {
          id: folder.name,
          displayName: folder.name
            .replace("-", " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          coverUrl: cover && "url" in cover ? cover.url : "",
          coverWidth: cover && "width" in cover ? cover?.width : 600,
          coverHeight: cover && "height" in cover ? cover?.height : 320,
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
  <PageLayout title="Photography · Lorenzo Cestaro">
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
                  <IKImage
                    className={styles.collectionCoverImage}
                    alt={collection.displayName}
                    height={collection.coverHeight}
                    loading="lazy"
                    lqip={{ active: true }}
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
