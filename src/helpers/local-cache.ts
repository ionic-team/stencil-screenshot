

export function getMismatchedPixels(imageA: string, imageB: string) {
  const cacheKey = getCacheKey(imageA, imageB);
  const mismatchedPixels = localStorage.getItem(cacheKey);
  if (typeof mismatchedPixels === 'string') {
    return parseInt(mismatchedPixels, 10);
  }
  return null;
}


export function setMismatchedPixels(imageA: string, imageB: string, mismatchedPixels: number) {
  const cacheKey = getCacheKey(imageA, imageB);
  localStorage.setItem(cacheKey, String(mismatchedPixels));
}


function getCacheKey(imageA: string, imageB: string) {
  return `screenshot_mismatch_${imageA}_${imageB}`;
}