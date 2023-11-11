import { CLOUD_NAME } from "./config";

export const getCollectionUrl = (collection: string): string => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${collection}.json`;
};
