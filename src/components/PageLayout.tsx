import React from "react";

import clsx from "clsx";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Cross } from "hamburger-react";
import Head from "next/head";

import { Footer } from "./Footer";
import { Menu, NavBar, OverlayMenu, useCollapsedMenu } from "./Navigation";

const MotionFooter = motion.create(Footer);
const MotionOverlayMenu = motion.create(OverlayMenu);

const styles = {
  container: clsx(
    "flex-col",
    "flex",
    "lg:px-14",
    "px-6",
    "w-full",
    "min-h-screen",
  ),
  content: clsx(
    "flex-col",
    "flex",
    "grow",
    "items-center",
    "overflow-hidden",
    "justify-center",
    "shrink",
  ),
};

export type PageLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  description: string;
  shareImageUrl?: string;
  title: string;
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  description,
  // Hand-made collage, shared by every page without a cover of its own.
  shareImageUrl = "https://ik.imagekit.io/lnz/share-collage.jpg",
  title,
}) => {
  const isMobile = useCollapsedMenu();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={shareImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareImageUrl} />
      </Head>

      <NavBar
        rightElement={
          isMobile ? (
            <Cross toggled={isOpen} toggle={setIsOpen} size={24} />
          ) : (
            <Menu />
          )
        }
      />

      <AnimatePresence>
        <LayoutGroup>
          {isOpen ? (
            <MotionOverlayMenu
              key="OverlayMenu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          ) : null}
          {!isOpen ? (
            <motion.main
              className={styles.content}
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.main>
          ) : null}
          {!isOpen ? (
            <MotionFooter
              key="Footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          ) : null}
        </LayoutGroup>
      </AnimatePresence>
    </div>
  );
};
