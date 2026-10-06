import React from "react";

import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { About, PageLayout } from "src/components";
import { getShareImageUrl } from "src/lib/imagekit";

export const getStaticProps: GetStaticProps<{
  shareImageUrl: string;
}> = async () => ({
  props: { shareImageUrl: await getShareImageUrl("homepage") },
  revalidate: 60 * 15,
});

const AboutPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  shareImageUrl,
}) => (
  <PageLayout
    title="About · Lorenzo Cestaro"
    description="Software engineer and hobby photographer."
    shareImageUrl={shareImageUrl}
  >
    <About />
  </PageLayout>
);

export default AboutPage;
