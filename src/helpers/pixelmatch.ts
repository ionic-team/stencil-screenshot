import pixelmatch from 'pixelmatch'


export function getMismatch(imageA: HTMLImageElement, imageB: HTMLImageElement, canvasDiff: HTMLCanvasElement, physicalWidth: number, physicalHeight: number) {
  const canvasA = document.createElement('canvas');
  canvasA.width = physicalWidth;
  canvasA.height = physicalHeight;

  const canvasB = document.createElement('canvas');
  canvasB.width = physicalWidth;
  canvasB.height = physicalHeight;

  const ctxA = canvasA.getContext('2d');
  ctxA.drawImage(imageA, 0, 0);

  const ctxB = canvasB.getContext('2d');
  ctxB.drawImage(imageB, 0, 0);

  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.drawImage(imageA, 0, 0);
  ctx.getImageData(0, 0, physicalWidth, physicalHeight)

  const dataA = ctxA.getImageData(0, 0, physicalWidth, physicalHeight).data as any;
  const dataB = ctxB.getImageData(0, 0, physicalWidth, physicalHeight).data as any;

  const ctxDiff = canvasDiff.getContext('2d');
  const imageDiff = ctxDiff.createImageData(physicalWidth, canvasA.height);

  const mismatchedPixels = pixelmatch(dataA, dataB, (imageDiff as any).data, physicalWidth, physicalHeight, { threshold: 0.1 });

  ctxDiff.putImageData(imageDiff, 0, 0);

  return mismatchedPixels;
}
