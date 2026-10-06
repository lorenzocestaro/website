import React from "react";

import { About, PageLayout } from "src/components";

const AboutPage: React.FC = () => (
  <PageLayout
    title="About · Lorenzo Cestaro"
    description="Software engineer and hobby photographer."
  >
    <About />
  </PageLayout>
);

export default AboutPage;
