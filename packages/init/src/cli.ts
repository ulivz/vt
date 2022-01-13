/**
 * Module dependencies
 */
import * as path from "path";
import { SAO } from "sao";
import chalk from "chalk";

const generator = path.resolve(__dirname, "../generator");

export async function bootstrapCli() {
  const cwd = process.cwd();
  const dist = process.argv[2];
  const outDir = dist ? path.resolve(cwd, dist) : cwd;
  const sao = new SAO({
    outDir,
    generator,
    update: true,
  });

  sao.logger.tip("output directory", chalk.gray(outDir));
  await sao.run();
}
