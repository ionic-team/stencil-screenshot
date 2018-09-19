import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      dir: '../stencil/screenshot/compare/',
    }
  ],
  globalStyle: 'src/global/app.css'
};
