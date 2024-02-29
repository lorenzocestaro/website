import React from "react";

import clsx from "clsx";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Cross } from "hamburger-react";
import Head from "next/head";

import { Footer } from "./Footer";
import { Menu, NavBar, OverlayMenu, useCollapsedMenu } from "./Navigation";

const MotionFooter = motion(React.forwardRef(Footer));
const MotionOverlayMenu = motion(OverlayMenu);

const styles = {
  container: (viewport?: boolean) =>
    clsx(
      "flex-col",
      "flex",
      "lg:px-14",
      "px-6",
      "w-screen",
      viewport ? "h-screen" : "min-h-screen",
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
  title: string;
  viewport?: boolean;
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  viewport,
}) => {
  const isMobile = useCollapsedMenu();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.container(viewport)}>
      <Head>
        <title>{title}</title>
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
