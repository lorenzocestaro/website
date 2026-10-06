import React from "react";

import { About, PageLayout } from "src/components";
import { SITE_SHARE_IMAGE_URL } from "src/lib/imagekit";

const AboutPage: React.FC = () => (
  <PageLayout
    title="About · Lorenzo Cestaro"
    description="Software engineer and hobby photographer."
    shareImageUrl={SITE_SHARE_IMAGE_URL}
  >
    <About />
  </PageLayout>
);

export default AboutPage;
