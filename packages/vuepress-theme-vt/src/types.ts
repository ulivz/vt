import type { DefaultThemeConfig } from "@vuepress/types";

export type ThemeConfig = DefaultThemeConfig & {
  /**
   * Enable dark mode
   * 
   * @default false
   */
  enableDarkMode?: boolean;
};
