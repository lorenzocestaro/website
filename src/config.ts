import { Cloudinary } from "@cloudinary/url-gen";

export const config = {
  cloudinary: new Cloudinary({
    cloud: { cloudName: "lnz" },
  }),
};
