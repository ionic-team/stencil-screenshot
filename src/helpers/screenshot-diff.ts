import * as d from './declarations';
import { getMismatchedPixels } from './mismatch-cache';
import { ScreenshotBuild } from '@stencil/core/screenshot';


export function calculateScreenshotDiffs(imagesUrl: string, buildA: ScreenshotBuild, buildB: ScreenshotBuild) {
  const diffs: d.ScreenshotDiff[] = [];

  buildA.screenshots.forEach(screenshotA => {
    const screenshotB = buildB.screenshots.find(s => s.id === screenshotA.id);
    if (!screenshotB) {
      return;
    }

    const identical = (screenshotA.image === screenshotB.image);

    const diff: d.ScreenshotDiff = {
      id: screenshotA.id,
      desc: screenshotA.desc,
      testPath: screenshotA.testPath,
      imageA: screenshotA.image,
      imageUrlA: `${imagesUrl}${screenshotA.image}`,
      imageB: screenshotB.image,
      imageUrlB: `${imagesUrl}${screenshotB.image}`,
      identical: identical,
      mismatchedPixels: (identical ? 0 : null),
      width: screenshotA.width,
      height: screenshotA.height,
      deviceScaleFactor: screenshotA.deviceScaleFactor,
      device: (screenshotA.device || screenshotA.userAgent),
      show: false
    };

    if (!identical) {
      const cachedMismatchedPixels = getMismatchedPixels(diff.imageA, diff.imageB);
      if (typeof cachedMismatchedPixels === 'number') {
        diff.mismatchedPixels = cachedMismatchedPixels;

        if (diff.mismatchedPixels === 0) {
          diff.identical = true;
        }
      }
    }

    diffs.push(diff);
  });

  return diffs;
}
