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
   * Status config, a plain text or a Vue component declaration ("e.g. <MyStatus />")
   */
  status?: string;

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
};
