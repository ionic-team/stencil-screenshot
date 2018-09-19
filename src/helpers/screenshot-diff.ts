import { ScreenshotBuild } from '@stencil/core/screenshot';


export function createScreenshotDiff(a: ScreenshotBuild, b: ScreenshotBuild, imagesUrl: string, jsonpUrl: string) {
  const screenshotDiffs = a.screenshots.map(screenshotA => {
    return {
      id: screenshotA.id,
      desc: screenshotA.desc,
      imageA: screenshotA.image,
      imageUrlA: `${imagesUrl}${screenshotA.image}`,
      jsonpUrlA: `${jsonpUrl}screenshot_${screenshotA.image}.js`,
      imageB: null,
      imageUrlB: null,
      jsonpUrlB: null,
      mismatchedPixels: null,
      mismatchedRatio: null,
      width: screenshotA.width,
      height: screenshotA.height,
      deviceScaleFactor: screenshotA.deviceScaleFactor,
      naturalWidth: screenshotA.naturalWidth,
      naturalHeight: screenshotA.naturalHeight,
      device: screenshotA.device,
      userAgent: screenshotA.userAgent
    } as ScreenshotDiff
  });

  b.screenshots.forEach(screenshotB => {
    let diff = screenshotDiffs.find(s => s.id === screenshotB.id);
    if (diff) {
      diff.imageB = screenshotB.image;
      diff.imageUrlB = `${imagesUrl}${screenshotB.image}`;
      diff.jsonpUrlB = `${jsonpUrl}screenshot_${screenshotB.image}.js`;

    } else {
      diff = {
        id: screenshotB.id,
        desc: screenshotB.desc,
        imageA: null,
        imageUrlA: null,
        jsonpUrlA: null,
        imageB: screenshotB.image,
        imageUrlB: `${imagesUrl}${screenshotB.image}`,
        jsonpUrlB: `${jsonpUrl}screenshot_${screenshotB.image}.js`,
        mismatchedPixels: null,
        mismatchedRatio: null,
        width: screenshotB.width,
        height: screenshotB.height,
        deviceScaleFactor: screenshotB.deviceScaleFactor,
        naturalWidth: screenshotB.naturalWidth,
        naturalHeight: screenshotB.naturalHeight,
        device: screenshotB.device,
        userAgent: screenshotB.userAgent
      } as ScreenshotDiff
      screenshotDiffs.push(diff);
    }
  });

  screenshotDiffs.forEach(diff => {
    diff.identical = (diff.imageUrlA === diff.imageUrlB);

    if (diff.identical) {
      diff.mismatchedPixels = 0;
      diff.mismatchedRatio = 0;
      return;
    }

  });

  return screenshotDiffs;
}



export interface ScreenshotDiff {
  id: string;
  desc: string;
  imageA: string;
  imageUrlA: string;
  jsonpUrlA: string;
  imageB: string;
  imageUrlB: string;
  jsonpUrlB: string;
  imageDiff: string;
  mismatchedPixels: number;
  mismatchedRatio: number;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  device: string;
  userAgent: string;
  deviceScaleFactor: number;
  identical: boolean;
}
