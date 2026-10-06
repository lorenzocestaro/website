import ImageKit from "@imagekit/nodejs";
import { type Photo } from "react-photo-album";

type PhotoFile = ImageKit.File &
  Required<Pick<ImageKit.File, "fileId" | "url" | "width" | "height">>;

type NamedFolder = ImageKit.Folder &
  Required<Pick<ImageKit.Folder, "name" | "folderPath">>;

// The SDK types these fields as optional, so narrow before using them.
export const isPhotoFile = (file: ImageKit.File): file is PhotoFile =>
  file.fileId !== undefined &&
  file.url !== undefined &&
  file.width !== undefined &&
  file.height !== undefined;

export const isNamedFolder = (folder: ImageKit.Folder): folder is NamedFolder =>
  folder.name !== undefined && folder.folderPath !== undefined;

export const toPhoto = (file: PhotoFile): Photo => ({
  key: file.fileId,
  src: file.url,
  width: file.width,
  height: file.height,
  title: String(file.customMetadata?.title),
});

export const pickCover = <T extends ImageKit.File>(files: T[]) =>
  files.find((file) => file.tags?.includes("cover")) ?? files[0];

// Social cards crop to roughly 1.91:1, so hand them a pre-cropped image.
export const toShareImageUrl = (file: PhotoFile) => {
  const url = new URL(file.url);
  url.searchParams.set("tr", "w-1200,h-630");

  return url.toString();
};

export const getShareImageUrl = async (path: string) => {
  const imagekit = new ImageKit();
  const files = await imagekit.assets.list({ path, type: "file" });

  return toShareImageUrl(pickCover(files.filter(isPhotoFile)));
};

export const toCollectionName = (folderName: string) =>
  folderName
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
