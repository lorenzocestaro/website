import { Cloudinary } from "@cloudinary/url-gen";

export const CLOUD_NAME = "lnz";

export const config = {
  cloudinary: new Cloudinary({
    cloud: { cloudName: CLOUD_NAME },
  }),
};
