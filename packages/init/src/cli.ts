/**
 * Module dependencies
 */
import * as path from "path";
import { SAO } from "sao";
import chalk from "chalk";

const generator = path.resolve(
  __dirname,
  "../node_modules/@piajs/generator-app"
);

export async function bootstrapCli() {
  const cwd = process.cwd();
  const dist = process.argv[2];
  const outDir = dist ? path.resolve(cwd, dist) : cwd;
  const sao = new SAO({
    outDir,
    generator,
    update: true,
    registry: "https://bnpm.byted.org",
  });

  sao.logger.tip("output directory", chalk.gray(outDir));
  await sao.run();
}
