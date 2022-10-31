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

export type ThemeConfig = Omit<DefaultThemeConfig, "nav"> & {
  /**
   * Navbar Links.
   */
  nav: EnhancedNavItem[];

  /**
   * Text in status bar
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
