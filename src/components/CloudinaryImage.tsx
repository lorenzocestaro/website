import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { type RenderPhotoProps } from "react-photo-album";

import { config } from "src/config";

export const CloudinaryImage = ({
  photo,
  wrapperStyle,
  imageProps: { alt, title, sizes, className },
}: RenderPhotoProps) => {
  const image = config.cloudinary
    .image(photo.src)
    .quality("auto")
    .resize(scale().width("auto"))
    .delivery(dpr("auto"));

  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <AdvancedImage
        alt={alt}
        className={className}
        cldImg={image}
        plugins={[
          lazyload({ rootMargin: "100px" }),
          placeholder({ mode: "blur" }),
        ]}
        sizes={sizes}
        title={title}
      />
    </div>
  );
};
