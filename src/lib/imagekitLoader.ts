import type { ImageLoaderProps } from "next/image";

// next/image asks for each srcset width; ImageKit resizes on its CDN.
// c-at_max stops ImageKit from upscaling past the original.
const imagekitLoader = ({ src, width }: ImageLoaderProps) => {
  const url = new URL(src);
  url.searchParams.set("tr", `w-${width},c-at_max`);

  return url.toString();
};

export default imagekitLoader;
