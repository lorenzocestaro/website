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

type PlaceholderDataURL = `data:image/svg+xml;${string}`;

export type GalleryPhoto = Photo & { placeholder: PlaceholderDataURL | null };

// Stretched to full size, the 32px image looks blocky, so blur it inside an
// SVG. The image overhangs the frame so the blur doesn't fade the edges.
const toBlurredSvg = (webp: string, { width, height }: PhotoFile) => {
  const svgHeight = Math.round((32 * height) / width);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 ${svgHeight}'><filter id='b'><feGaussianBlur stdDeviation='1'/></filter><image x='-1.5' y='-1.5' width='35' height='${svgHeight + 3}' preserveAspectRatio='none' href='${webp}' filter='url(#b)'/></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` as const;
};

// Inlined into the page as next/image's placeholder, about 800 characters.
export const fetchPlaceholder = async (
  file: PhotoFile,
): Promise<PlaceholderDataURL | null> => {
  const placeholderUrl = new URL(file.url);
  placeholderUrl.searchParams.set("tr", "w-32,q-50,f-webp");

  const request = () =>
    fetch(placeholderUrl, { signal: AbortSignal.timeout(5000) });

  try {
    // ImageKit resets some connections in a burst (ECONNRESET), so retry
    // network errors once. fetch throws TypeError only for those.
    const response = await request().catch((error) => {
      if (!(error instanceof TypeError)) throw error;
      return request();
    });
    if (!response.ok) {
      throw new Error(`status ${response.status}`);
    }
    const bytes = Buffer.from(await response.arrayBuffer());

    return toBlurredSvg(
      `data:image/webp;base64,${bytes.toString("base64")}`,
      file,
    );
  } catch (error) {
    console.warn(
      `Placeholder failed for ${file.url}:`,
      error,
      (error as Error).cause,
    );
    return null;
  }
};

export const toPhoto = async (file: PhotoFile): Promise<GalleryPhoto> => ({
  key: file.fileId,
  src: file.url,
  width: file.width,
  height: file.height,
  title: String(file.customMetadata?.title),
  placeholder: await fetchPlaceholder(file),
});

export const pickCover = (files: PhotoFile[]) =>
  files.find((file) => file.tags?.includes("cover")) ?? files[0];

// Social cards crop to roughly 1.91:1, so hand them a pre-cropped image.
export const toShareImageUrl = (file: PhotoFile) => {
  const url = new URL(file.url);
  url.searchParams.set("tr", "w-1200,h-630");

  return url.toString();
};

export const toCollectionName = (folderName: string) =>
  folderName
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
