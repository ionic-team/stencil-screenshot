import { Config } from "@stencil/core";

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: "www",
      serviceWorker: false,
    },
    {
      type: "www",
      dir: "../stencil/screenshot/compare/",
      serviceWorker: false,
    },
  ],
  globalStyle: "src/global/app.css",
  buildEs5: false,
  extras: {
    cssVarsShim: false,
    dynamicImportShim: false,
    safari10: false,
    scriptDataOpts: false,
    shadowDomShim: false,
  },
};
