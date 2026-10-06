import ImageKit from "@imagekit/nodejs";
import { type Photo } from "react-photo-album";

type PhotoFile = ImageKit.File &
  Required<Pick<ImageKit.File, "fileId" | "url" | "width" | "height">>;

// The SDK types these fields as optional, so narrow before using them.
const isPublicPhoto = (file: ImageKit.File): file is PhotoFile =>
  file.isPrivateFile === false &&
  file.fileId !== undefined &&
  file.url !== undefined &&
  file.width !== undefined &&
  file.height !== undefined;

export const listPhotos = async (path: string) => {
  const files = await new ImageKit().assets.list({ path, type: "file" });

  return files.filter(isPublicPhoto);
};

export const listCollectionIds = async () => {
  const folders = await new ImageKit().assets.list({
    path: "collections",
    type: "folder",
  });

  return folders.flatMap((folder) => folder.name ?? []);
};

export const toPhoto = (file: PhotoFile): Photo => ({
  key: file.fileId,
  src: file.url,
  width: file.width,
  height: file.height,
  title: String(file.customMetadata?.title),
});

export const pickCover = (files: PhotoFile[]) =>
  files.find((file) => file.tags?.includes("cover")) ?? files[0];

// Social cards crop to roughly 1.91:1, so hand them a pre-cropped image.
export const toShareImageUrl = (file: PhotoFile) => {
  const url = new URL(file.url);
  url.searchParams.set("tr", "w-1200,h-630");

  return url.toString();
};

export const getShareImageUrl = async (path: string) =>
  toShareImageUrl(pickCover(await listPhotos(path)));

export const toCollectionName = (folderName: string) =>
  folderName
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
