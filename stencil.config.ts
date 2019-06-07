import { Config, h } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null
    },
    {
      type: 'www',
      dir: '../stencil/screenshot/compare/',
      serviceWorker: null
    }
  ],
  globalStyle: 'src/global/app.css'
};
