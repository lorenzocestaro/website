import React from "react";

import clsx from "clsx";

import { About, PageLayout } from "src/components";

const styles = {
  about: clsx("grow", "shrink", "w-8/12", "m-auto", "h-full"),
};

const AboutPage: React.FC = () => (
  <PageLayout title="About · Lorenzo Cestaro">
    <About />
  </PageLayout>
);

export default AboutPage;
