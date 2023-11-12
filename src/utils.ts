import { CLOUD_NAME } from "./config";
import { Photo } from "./types";

export const getCollectionUrl = (collection: string): string => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${collection}.json`;
};

export const imageResourceToPhoto = (imageResource: any): Photo => ({
  id: imageResource.public_id,
  width: imageResource.width,
  height: imageResource.height,
  created_at: imageResource.created_at,
  alt: imageResource.context?.custom?.alt || "",
  title: imageResource.context?.custom?.caption || "",
});
