import type { DefaultThemeConfig } from "@vuepress/types";

export type ThemeConfig = DefaultThemeConfig & {
  /**
   * Enable full text search
   */
  enableFullTextSearch?: boolean;
};
