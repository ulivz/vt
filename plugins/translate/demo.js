// var translate = require("node-google-translate-skidz");
// var fs = require("fs");

// translate(
//   {
//     text: fs.readFileSync(
//       "/Users/bytedance/Documents/code/pia/docs/docs/src/guide/essentials/pia-prefetch.md",
//       "utf-8"
//     ),
//     source: "zh-CN",
//     target: "en-US",
//   },
//   function (result) {
//     console.log(result);
//   }
// );

const input = `
| Features | Applicable business scenarios | What business problems are solved |
| ------------------------------------------------- - | --------------------------------------------- |- -------------------------------------------------- --------------------------- |
| [Pre-request](./essentials/pia-prefetch.md) | Page rendering depends on "requests" | Reduce the "request" time of the first screen |
| [Kernel prediction optimization](./essentials/predictor.md) | There are a lot of resources on the page that need to be loaded and analyzed | Improve the speed of loading and analyzing resources on the first screen |
| [Page Snapshot](./essentials/ html-snapshot.md) | The second opening of the page still requires a complete rendering process | The second opening directly reuses the first rendering result |
| [Pre-rendered background](./essentials/native-background.md) | Marketing, event scenes, there are custom background colors and background images on the first screen | Marketing scenarios usually have custom background colors and background images, directly There may be an obvious white screen when handed over to the front-end rendering |
| [Pre-execution Worker](./essentials/pre-execute-worker.md) | Content information business, expect the first few cards to be **"open in seconds"** | By pre-executing the first few cards, Directly reduce the request time to 0, enter the next page will be able to open in seconds |

-[PIA Worker](../essentials/pia-worker.md) life cycle scheduling;
-[End Inner] (./client-mode.md# End Inner Mode), [End Outer] (./client-mode.md# End Inner Mode) mode;
-[Performance](./performance.md);

- [**SCM**](https://cloud.bytedance.net/scm/favor): used to compile and build front-end projects
-[**ByteCycle**](https://bytecycle.bytedance.net/home): Atomic service integrating the above R&D process, hosting the entire deployment link

::: tip
The relevant links in the document case are as follows:
-Preview link: https://pia.cn.goofy.app/pia_deploy_test/index.html
-GitLab: [pia_deploy_test](https://code.byted.org/chenhao.skychx/pia_deploy_test)
-SCM: [toutiao/pia/pia_deploy_test](https://cloud.bytedance.net/scm/detail/166744/versions)
-Goofy: [Goofy Web-PIA deployment test](https://goofy.byted.org/2/goofy-deploy/deploy-detail/29764/deploy-info?refer=my-deploy-list)
-Gecko: [Gecko-pia_test_1](https://cloud.bytedance.net/gecko/site/app/10219/deployment/10507/channel/88151477)
-ByteCycle: [ByteCycle-PIA deployment test](https://bytecycle.bytedance.net/space/experience_space/module/pipeline/info/1947910?activeTab=1&buildPanes=&buildId=)
:::
`;

const b = input.replace(/(\s?)([-\s]+)(\s?\|)(\n)?/g, (m, s1, s2, s3, s4) => {
  console.log(s2);

  return s1 + s2.replace(/\s/g, "") + s3 + (s4||'');
})
.replace(/(\[[^\[\]()]*\])\s?(\([^()]*\))/g, (m, s1, s2) => {
  return s1 + s2.replace(/\s/g, "");
})
.replace(/^-(\[|\w)/gm, "- $1")

console.log(b);
