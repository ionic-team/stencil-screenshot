import * as d from './declarations';
import { getMismatchedPixels } from './mismatch-cache';
import { ScreenshotBuild } from '@stencil/core/screenshot';


export function calculateScreenshotDiffs(imagesUrl: string, buildA: ScreenshotBuild, buildB: ScreenshotBuild) {
  const diffs: d.ScreenshotDiff[] = [];

  if (!buildA || !buildB) {
    return diffs;
  }

  buildB.screenshots.forEach(screenshotB => {
    const diff: d.ScreenshotDiff = {
      id: screenshotB.id,
      desc: screenshotB.desc,
      testPath: screenshotB.testPath,
      imageA: null,
      imageUrlA: null,
      imageB: screenshotB.image,
      imageUrlB: `${imagesUrl}${screenshotB.image}`,
      identical: false,
      comparable: false,
      mismatchedPixels: null,
      width: screenshotB.width,
      height: screenshotB.height,
      deviceScaleFactor: screenshotB.deviceScaleFactor,
      device: (screenshotB.device || screenshotB.userAgent),
      show: false,
      hasIntersected: false,
      threshold: typeof screenshotB.threshold === 'number' ? screenshotB.threshold : 0.05
    };
    diffs.push(diff);
  });

  buildA.screenshots.forEach(screenshotA => {
    const diff = diffs.find(d => d.id === screenshotA.id);
    if (diff) {
      diff.imageA = screenshotA.image;
      diff.imageUrlA = `${imagesUrl}${screenshotA.image}`;
    }
  });

  diffs.forEach(diff => {
    diff.comparable = (diff.imageA != null && diff.imageB != null);
    diff.identical = (diff.comparable && diff.imageA === diff.imageB);

    if (diff.identical) {
      diff.mismatchedPixels = 0;

    } else {
      const cachedMismatchedPixels = getMismatchedPixels(diff.imageA, diff.imageB, diff.threshold);
      if (typeof cachedMismatchedPixels === 'number') {
        diff.mismatchedPixels = cachedMismatchedPixels;

        if (diff.mismatchedPixels === 0) {
          diff.identical = true;
        }
      }
    }
  });

  return diffs;
}
