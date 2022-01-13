const fs = require("fs-extra");
const path = require("path");
const { cp } = require("@nomadland/cp");

async function build() {
  const generatorDir = path.join(__dirname, "../generator");
  const defaultSource = path.join(__dirname, "../../example");
  const defaultTarget = path.join(generatorDir, "default");
  const i18nSource = path.join(__dirname, "../../docs");
  const i18nTarget = path.join(generatorDir, "i18n");

  fs.ensureDirSync(defaultTarget);
  fs.ensureDirSync(i18nTarget);

  console.log("defaultSource", defaultSource);

  await cp({
    src: defaultSource,
    dist: defaultTarget,
    files: {
      "**": true,
      node_modules: false,
      "package.json": {
        rename: "_package.json",
        // set basic interpolation
        transform: (content) => {
          const pkg = JSON.parse(content);
          pkg.name = "{{ name }}";
          pkg.description = "{{ description }}";
          pkg.author = "{{ username }} <{{ email }}>";
          return JSON.stringify(pkg, null, 2);
        },
      },
    },
  });
}

build();
