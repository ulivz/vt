/** @format */

import type { DefaultThemeConfig } from "@vuepress/types";

export type ThemeConfig = DefaultThemeConfig & {
  /**
   * Text in status bar
   *
   */
  statusText?: string;

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
    targetFile: string,
  ) => string;
  /**
   * Options for code switcher.
   */
  codeSwitcher?: {
    groups?: Record<string, Record<string, string>>;
  };
};
