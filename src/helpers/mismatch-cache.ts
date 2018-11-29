

export function getMismatchedPixels(imageA: string, imageB: string, threshold: number) {
  const cacheKey = getCacheKey(imageA, imageB, threshold);
  const mismatchedPixels = localStorage.getItem(cacheKey);
  if (typeof mismatchedPixels === 'string') {
    const num = parseInt(mismatchedPixels, 10);
    if (!isNaN(num)) {
      return num;
    }
  }
  return null;
}


export function setMismatchedPixels(imageA: string, imageB: string, threshold: number, mismatchedPixels: number) {
  const cacheKey = getCacheKey(imageA, imageB, threshold);
  localStorage.setItem(cacheKey, String(mismatchedPixels));
}


function getCacheKey(imageA: string, imageB: string, threshold: number) {
  return `screenshot_mismatch_${imageA}_${imageB}_${threshold}`;
}