import type { DefaultThemeConfig } from "@vuepress/types";

export type ThemeConfig = DefaultThemeConfig & {
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
  transformTranslatedDocument(
    content: string,
    sourceFile: string,
    targetFile: string
  ): string;
};
