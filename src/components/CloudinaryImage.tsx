import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";
import Link from "next/link";
import { type RenderPhotoProps } from "react-photo-album";

import { config } from "src/config";

export const CloudinaryImage = ({
  photo,
  wrapperStyle,
  imageProps: { alt, title, sizes, className, onClick },
}: RenderPhotoProps) => {
  const image = config.cloudinary
    .image(photo.src)
    .quality("auto")
    .resize(scale().width("auto"))
    .delivery(dpr("auto"));

  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Link
        className="cursor-zoom-in"
        href={`/photo/${encodeURIComponent(photo.src)}`}
      >
        <AdvancedImage
          alt={alt}
          className={className}
          cldImg={image}
          onClick={onClick}
          plugins={[
            lazyload({ rootMargin: "100px" }),
            placeholder({ mode: "blur" }),
          ]}
          sizes={sizes}
          title={title}
        />
      </Link>
    </div>
  );
};
