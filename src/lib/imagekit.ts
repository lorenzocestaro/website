import type ImageKit from "@imagekit/nodejs";
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
