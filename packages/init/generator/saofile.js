/**
 * @type {import('SAO').GeneratorConfig}
 */
module.exports = {
  prompts() {
    return [
      {
        type: "input",
        name: "name",
        message: "What's the name of your VT Website.",
        default: this.outFolder,
      },
      {
        type: "input",
        name: "description",
        message: "How would you describe your Website.",
        default: `my awesome VT project`,
      },
      {
        type: "input",
        name: "username",
        message: "What's your git username",
        default: this.gitUser.username || this.gitUser.name,
        store: true,
      },
      {
        type: "input",
        name: "email",
        message: "What's your email?",
        default: this.gitUser.email,
        store: true,
      },
      {
        type: "select",
        choices: ["default", "i18n"],
        name: "type",
        message: "Select type",
        default: "react",
        store: true,
      },
      {
        type: "select",
        choices: ["Y", "N"],
        name: "npmInstall",
        message: "Run `pnpm install` after project is created?",
        default: "N",
        store: true,
      },
    ];
  },
  async actions() {
    const moveAction = {
      type: "move",
      patterns: {
        gitignore: ".gitignore",
        "_package.json": "package.json",
      },
    };
    if (this.answers.type === "default") {
      return [
        {
          type: "add",
          files: "**",
          templateDir: "default",
          transformInclude: ['package.json']
        },
        moveAction,
      ];
    } else if (this.answers.type === "i18n") {
      return [
        {
          type: "add",
          files: "**",
          templateDir: "i18n",
          transformInclude: ['package.json']
        },
        moveAction,
      ];
    }
  },
  async completed() {
    this.gitInit();
    if (this.answers.npmInstall === "Y") {
      await this.npmInstall();
    }
    this.showProjectTips();
  },
};
