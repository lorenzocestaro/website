import React from "react";

import clsx from "clsx";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Cross } from "hamburger-react";
import Head from "next/head";

import { Footer } from "./Footer";
import { Menu, NavBar, OverlayMenu, useIsMobile } from "./Navigation"; // TODO: move useIsMobile

const MotionFooter = motion(Footer);
const MotionOverlayMenu = motion(OverlayMenu);

const styles = {
  container: clsx("flex", "flex-col", "min-h-screen", "w-screen"),
  content: clsx("grow"),
};

export type PageLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  title: string;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <NavBar
        rightElement={
          isMobile ? <Cross toggled={isOpen} toggle={setIsOpen} /> : <Menu />
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
