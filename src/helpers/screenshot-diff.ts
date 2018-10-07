import * as d from './declarations';
import { ScreenshotBuild } from '@stencil/core/screenshot';
import { getMismatchedPixels } from './mismatch-cache';


export function createScreenshotDiff(a: ScreenshotBuild, b: ScreenshotBuild, imagesUrl: string, jsonpUrl: string) {
  const screenshotDiffs = a.screenshots.map(screenshotA => {
    const diff: d.ScreenshotDiff = {
      id: screenshotA.id,
      desc: screenshotA.desc,
      testPath: screenshotA.testPath,
      imageA: screenshotA.image,
      imageUrlA: `${imagesUrl}${screenshotA.image}`,
      jsonpUrlA: `${jsonpUrl}screenshot_${screenshotA.image}.js`,
      imageB: null,
      imageUrlB: null,
      jsonpUrlB: null,
      imageDiff: null,
      identical: false,
      mismatchedPixels: null,
      width: screenshotA.width,
      height: screenshotA.height,
      deviceScaleFactor: screenshotA.deviceScaleFactor,
      device: screenshotA.device || screenshotA.userAgent,
      hidden: true
    };
    return diff;
  });

  b.screenshots.forEach(screenshotB => {
    let diff = screenshotDiffs.find(s => s.id === screenshotB.id) as d.ScreenshotDiff;
    if (diff) {
      diff.imageB = screenshotB.image;
      diff.imageUrlB = `${imagesUrl}${screenshotB.image}`;
      diff.jsonpUrlB = `${jsonpUrl}screenshot_${screenshotB.image}.js`;

    } else {
      diff = {
        id: screenshotB.id,
        desc: screenshotB.desc,
        testPath: screenshotB.testPath,
        imageA: null,
        imageUrlA: null,
        jsonpUrlA: null,
        imageB: screenshotB.image,
        imageUrlB: `${imagesUrl}${screenshotB.image}`,
        jsonpUrlB: `${jsonpUrl}screenshot_${screenshotB.image}.js`,
        imageDiff: null,
        identical: false,
        mismatchedPixels: null,
        width: screenshotB.width,
        height: screenshotB.height,
        deviceScaleFactor: screenshotB.deviceScaleFactor,
        device: screenshotB.device || screenshotB.userAgent,
        hidden: true
      };
      screenshotDiffs.push(diff);
    }
  });

  screenshotDiffs.forEach(diff => {
    diff.identical = (diff.imageUrlA === diff.imageUrlB);

    if (diff.identical) {
      diff.mismatchedPixels = 0;
      return;
    }

    const cachedMismatchedPixels = getMismatchedPixels(diff.imageA, diff.imageB);
    if (typeof cachedMismatchedPixels === 'number') {
      diff.mismatchedPixels = cachedMismatchedPixels;

      if (diff.mismatchedPixels === 0) {
        diff.identical = true;
      }
    }
  });

  return screenshotDiffs;
}
