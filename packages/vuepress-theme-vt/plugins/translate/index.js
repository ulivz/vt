const inquirer = require("inquirer");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs-extra");

const logPrefix = chalk.gray("[Translate]");
const log = (str) => console.log(`${logPrefix} ${str}`);

const Statement = `
::: tip
Note that this document is temporarily generated by a translation tool, feel free to help us improve it. ❤️
:::
`;

/**
 * @type {import('@vuepress/types').Plugin<{}, import('../../src/types').ThemeConfig>}
 */
module.exports = (options, ctx) => ({
  name: "@vt/translate",
  async ready() {
    /**
     * 1. Only enable translate when "process.env.VP_ENABLE_TRANSLATE" is not empty.
     */
    if (!process.env.VP_ENABLE_TRANSLATE) {
      return;
    }

    /**
     * 2. i18n check.
     */
    const locales = ctx.siteConfig.locales;
    const enableI18n = !!locales;
    if (enableI18n) {
      const sourceLocale = locales["/"];
      const targetLocales = Object.keys(locales)
        .filter((key) => key !== "/")
        .reduce((memo, prefix) => {
          memo.push({
            prefix,
            lang: locales[prefix].lang,
          });
          return memo;
        }, []);

      const dirBlacklist = targetLocales.map((locale) => {
        return path.join(ctx.sourceDir, locale.prefix);
      });

      const pageCandidates = ctx.pages.filter((page) => {
        return dirBlacklist.every((item) => !page._filePath.startsWith(item));
      });

      pageCandidates.forEach((candidate) => {
        log(chalk.gray("[Candidate] ") + chalk.dim(candidate.relativePath));
      });

      const { yes } = await inquirer.prompt([
        {
          name: "yes",
          message: `Continue translate all pages under "${chalk.cyan(
            chalk.cyan(`${sourceLocale.lang} ("/")`)
          )}" to "${targetLocales
            .map((l) => chalk.cyan(`${l.lang} (${l.prefix})`))
            .join(",")}"`,
          type: "list",
          choices: ["N", "Y"],
        },
      ]);

      if (yes === "Y") {
        const googleTranslate = require("node-google-translate-skidz");
        async function translate(text, source, target) {
          return new Promise((resolve, reject) => {
            googleTranslate(
              {
                text,
                source,
                target,
              },
              function (result) {
                resolve(result.translation);
              }
            );
          });
        }

        log("Start ...");

        for (const locale of targetLocales) {
          for (const source of pageCandidates) {
            const relative = path.join(locale.prefix, source.relativePath);
            const target = path.join(ctx.sourceDir, relative);
            fs.ensureDirSync(path.dirname(target));
            log(
              `${chalk.gray(source.relativePath)} to ${chalk.gray(relative)}`
            );

            let result = await translate(
              source._content,
              sourceLocale.lang,
              locale.lang
            );

            if (typeof options.transformTranslatedDocument === "function") {
              result = typeof options.transformTranslatedDocument(
                result,
                relative,
                target
              );
            }

            result = result
              .replace(/^#\s+[^#]+$/gm, (m) => {
                return m + Statement + "\n";
              })
              // fixes basic term
              .replace(/pre-request/, "Prefetch")
              .replace(/Pre-execution Worker/, "Pre-execute Worker")
              // fixes -[]() to - []()
              .replace(/^-(\[|\w`)/gm, "- $1")
              // fix invalid table: | ----- -- |
              .replace(/(\s?)([-\s]+)(\s?\|)(\n)?/g, (m, s1, s2, s3, s4) => {
                return s1 + s2.replace(/\s/g, "") + s3 + (s4 || "");
              })
              // fix invalid whitespace at link: [a] (b c)
              .replace(/(\[[^\[\]()]*\])(\([^()]*\))/g, (m, s1, s2) => {
                return s1 + s2.replace(/\s/g, "");
              });

            await fs.writeFile(target, result, "utf-8");
          }
        }
      }
    }
  },
});
