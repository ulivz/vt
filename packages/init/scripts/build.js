const fs = require("fs-extra");
const path = require("path");
const { cp } = require("@nomadland/cp");

async function build() {
  const generatorDir = path.join(__dirname, "../generator");
  const actions = [
    {
      source: path.join(__dirname, "../../docs"),
      target: path.join(generatorDir, "default"),
    },
    {
      source: path.join(__dirname, "../../i18n"),
      target: path.join(generatorDir, "i18n"),
    },
  ];

  for (const action of actions) {
    fs.ensureDirSync(action.target);
    await cp({
      src: action.source,
      dist: action.target,
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
}

build();
