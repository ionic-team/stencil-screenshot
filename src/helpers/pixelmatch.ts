import pixelmatch from 'pixelmatch'


export function getMismatch(imageA: HTMLImageElement, imageB: HTMLImageElement, canvasDiff: HTMLCanvasElement, naturalWidth: number, naturalHeight: number) {
  let mismatchedPixels = -1;

  try {
    const canvasA = document.createElement('canvas');
    canvasA.width = naturalWidth;
    canvasA.height = naturalHeight;

    const canvasB = document.createElement('canvas');
    canvasB.width = naturalWidth;
    canvasB.height = naturalHeight;

    const ctxA = canvasA.getContext('2d');
    ctxA.drawImage(imageA, 0, 0);

    const ctxB = canvasB.getContext('2d');
    ctxB.drawImage(imageB, 0, 0);

    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    ctx.drawImage(imageA, 0, 0);
    ctx.getImageData(0, 0, naturalWidth, naturalHeight)

    const dataA = ctxA.getImageData(0, 0, naturalWidth, naturalHeight).data as any;
    const dataB = ctxB.getImageData(0, 0, naturalWidth, naturalHeight).data as any;

    const ctxDiff = canvasDiff.getContext('2d');
    const imageDiff = ctxDiff.createImageData(naturalWidth, canvasA.height);

    mismatchedPixels = pixelmatch(dataA, dataB, (imageDiff as any).data, naturalWidth, naturalHeight, { threshold: 0.1 });

    ctxDiff.putImageData(imageDiff, 0, 0);

  } catch (e) {
    console.error(e);
  }

  return mismatchedPixels;
}
