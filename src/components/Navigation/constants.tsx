import { Instagram, Linkedin, Mail } from "react-feather";

import { MenuItem, SocialLink } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  {
    href: "/photography",
    label: "Photography",
  },
  {
    href: "/about",
    label: "About",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/lorenzocestaro/",
    icon: <Linkedin size={20} />,
  },
  {
    href: "https://www.instagram.com/lorenzo.cestaro/",
    icon: <Instagram size={20} />,
  },
  {
    href: "mailto:hi@lorenzocestaro.com",
    icon: <Mail size={20} />,
  },
];
