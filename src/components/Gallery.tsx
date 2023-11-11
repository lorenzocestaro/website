import React from "react";

import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import {} from "@cloudinary/url-gen";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";
import PhotoAlbum, { type RenderPhotoProps } from "react-photo-album";

import { config } from "src/config";

const getColumns = (width: number) => {
  if (width < 500) {
    return 1;
  }

  if (width < 1000) {
    return 2;
  }

  return 3;
};

const CustomImage = ({
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
      <AdvancedImage
        cldImg={image}
        plugins={[
          lazyload({ rootMargin: "50px" }),
          placeholder({ mode: "blur" }),
        ]}
        {...{ alt, title, sizes, className, onClick }}
      />
    </div>
  );
};

const cloudinaryPhotos = [
  {
    public_id: "Ireland/R1-05621-031A_Large_t2anop",
    version: 1699394874,
    format: "jpg",
    width: 858,
    height: 1280,
    type: "upload",
    created_at: "2023-11-07T22:07:54Z",
    context: {
      custom: {
        alt: "Fanore Beach, Ireland",
        caption: "Fanore Beach, Ireland",
      },
    },
  },
  {
    public_id: "Ireland/R1-05621-027A_Large_eimrog",
    version: 1699394873,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:53Z",
  },
  {
    public_id: "Miscellaneous/R1-05620-0021_Large_bkoamf",
    version: 1699394873,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:53Z",
  },
  {
    public_id: "Tre cime/R1-02426-030A_Large_nv7xae",
    version: 1699394869,
    format: "jpg",
    width: 858,
    height: 1280,
    type: "upload",
    created_at: "2023-11-07T22:07:49Z",
  },
  {
    public_id: "Tre cime/R1-02426-024A_Large_rtpina",
    version: 1699394869,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:49Z",
  },
  {
    public_id: "Tre cime/R1-02426-003A_Large_rb1ypn",
    version: 1699394868,
    format: "jpg",
    width: 858,
    height: 1280,
    type: "upload",
    created_at: "2023-11-07T22:07:48Z",
  },
  {
    public_id: "Madeira/R1-02425-020A_Large_uk1q43",
    version: 1699394867,
    format: "jpg",
    width: 858,
    height: 1280,
    type: "upload",
    created_at: "2023-11-07T22:07:47Z",
  },
  {
    public_id: "Madeira/R1-02425-018A_Large_mgfo1t",
    version: 1699394867,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:47Z",
  },
  {
    public_id: "Madeira/R1-02424-034A_Large_xhv2ad",
    version: 1699394865,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:45Z",
  },
  {
    public_id: "Madeira/R1-02424-002A_Large_ok2vy1",
    version: 1699394864,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:44Z",
  },
  {
    public_id: "Madeira/R1-02423-016A_Large_btuax5",
    version: 1699394863,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:43Z",
  },
  {
    public_id: "Madeira/R1-02423-013A_Large_fh9ck9",
    version: 1699394862,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:42Z",
  },
  {
    public_id: "Madeira/R1-02423-011A_Large_zytypf",
    version: 1699394862,
    format: "jpg",
    width: 858,
    height: 1280,
    type: "upload",
    created_at: "2023-11-07T22:07:42Z",
  },
  {
    public_id: "Madeira/R1-02423-009A_Large_kxlsxx",
    version: 1699394861,
    format: "jpg",
    width: 1280,
    height: 858,
    type: "upload",
    created_at: "2023-11-07T22:07:41Z",
  },
  {
    public_id: "South Africa/DSCF5410_Large_yh7vj0",
    version: 1699394861,
    format: "jpg",
    width: 1280,
    height: 853,
    type: "upload",
    created_at: "2023-11-07T22:07:41Z",
  },
  {
    public_id: "South Africa/DSCF5205_Large_v0ybp7",
    version: 1699394860,
    format: "jpg",
    width: 1280,
    height: 853,
    type: "upload",
    created_at: "2023-11-07T22:07:40Z",
  },
  {
    public_id: "Miscellaneous/DSCF3877_Large_ot0wlw",
    version: 1699394859,
    format: "jpg",
    width: 1280,
    height: 853,
    type: "upload",
    created_at: "2023-11-07T22:07:39Z",
  },
  {
    public_id: "South Africa/_MG_0060_Large_na3bod",
    version: 1699394858,
    format: "jpg",
    width: 1280,
    height: 853,
    type: "upload",
    created_at: "2023-11-07T22:07:38Z",
  },
  {
    public_id: "South Africa/_MG_0037_Large_j1jkkc",
    version: 1699394857,
    format: "jpg",
    width: 1280,
    height: 853,
    type: "upload",
    created_at: "2023-11-07T22:07:37Z",
  },
  {
    public_id: "Berlin/_MG_0021_Large_zy0dj7",
    version: 1699394857,
    format: "jpg",
    width: 855,
    height: 1280,
    type: "upload",
    created_at: "2023-11-07T22:07:37Z",
  },
];

const photos = cloudinaryPhotos.map((photo) => ({
  src: photo.public_id,
  width: photo.width,
  height: photo.height,
  alt: photo?.context?.custom.alt ?? "",
  title: photo?.context?.custom.caption ?? "",
}));

export type GalleryProps = {
  tag: string;
};

export const Gallery = ({ tag }) => {
  return (
    <div className="w-full px-10">
      <PhotoAlbum
        columns={getColumns}
        defaultContainerWidth={1200}
        layout="columns"
        photos={photos}
        renderPhoto={CustomImage}
        spacing={10}
      />
    </div>
  );
};
