/** @format */

import type { DefaultThemeConfig, NavItem } from "@vuepress/types";

export type EnhancedNavItem = NavItem & {
  /**
   * Specify the position of navbar item.
   *
   * @default "right"
   */
  position?: "left" | "right";
};

export interface SidebarNavLink {
  /**
   * Nav link title
   */
  title?: string;
  /**
   * When to display nav links (when current route match these routes conditions)
   */
  include: string[];
  /**
   * When to hidden nav links (only need it when you want to exclude some paths in "include".)
   */
  exclude?: string[];
  /**
   * Nav links config
   */
  items: Array<{
    /**
     * Nav link's text
     */
    text: string;
    /**
     * Nav link's link, click behavior
     */
    link: string;
    /**
     * Range route matcher for active behavior
     */
    activeRange?: string | string[];
  }>;
}

export type ThemeConfig = Omit<DefaultThemeConfig, "nav" | "locales"> & {
  /**
   * Locales config.
   */
  locales?: Record<string, Omit<ThemeConfig, "locales">>;

  /**
   * Navbar Links.
   */
  nav?: EnhancedNavItem[];

  /**
   * Sidebar nav links.
   */
  sidebarNav?: SidebarNavLink[];

  /**
   * Status config, a plain text or a Vue component declaration ("e.g. <MyStatus />")
   */
  status?: string;

  /**
   * Used to control status version, defaults to "v1".
   */
  statusVersion?: string;

  /**
   * Enable dark mode
   *
   * @default false
   */
  enableDarkMode?: boolean;
  /**
   * Transform document transformed by Google translate.
   *
   * @param content
   * @param sourceFile
   * @param targetFile
   */
  transformTranslatedDocument?: (
    content: string,
    sourceFile: string,
    targetFile: string
  ) => string;
  /**
   * Options for code switcher.
   */
  codeSwitcher?: {
    groups?: Record<string, Record<string, string>>;
  };
  /**
   * Scroll active sidebar link into view.
   */
  sidebarActiveLinkScrollIntoView?: boolean;
};
